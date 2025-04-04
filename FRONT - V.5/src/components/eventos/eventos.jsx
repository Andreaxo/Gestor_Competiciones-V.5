import React, { useState, useEffect, useRef } from 'react';
import { Modal, List, Empty, Dropdown, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import '../../styles/Eventos/StyleEvento.css';
import { Badge, Calendar } from 'antd';
import { CrearEvento } from './crearEvento';
import { ModificarEvento } from './ModificarEvento';
import dayjs from 'dayjs';

export const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [isModalView, setIsModalView] = useState(false);
  const [isEventosDiaModalVisible, setIsEventosDiaModalVisible] = useState(false);
  const [isModificarEventoVisible, setIsModificarEventoVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [disableSelect, setDisableSelect] = useState(false);
  
  // Referencia al contenedor principal
  const containerRef = useRef(null);

  // Función para obtener eventos desde la API
  const fetchEventos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/eventos');
      if (!response.ok) {
        throw new Error('Error al obtener los eventos');
      }
      const data = await response.json();
      
      // Acceder al primer elemento del array (los eventos)
      const eventosData = data.body[0] || [];
      
      console.log('Eventos:', eventosData);
      
      // Establecer los eventos
      setEventos(eventosData);
    } catch (error) {
      console.error('Error fetching eventos:', error);
      setEventos([]); // Establecer como array vacío en caso de error
    }
  };

  // Cargar eventos al montar el componente
  useEffect(() => {
    fetchEventos();
    
    // Agregar un manejador global para identificar clics en el selector de mes y año
    const handleGlobalClick = (e) => {
      // Verificar si el clic fue en el selector de mes/año
      const isSelectorClick = e.target.closest('.ant-picker-calendar-header-view');
      
      if (isSelectorClick) {
        // Desactivar temporalmente la selección de fecha
        setDisableSelect(true);
        // Reactivar después de un tiempo
        setTimeout(() => {
          setDisableSelect(false);
        }, 300);
      }
    };
    
    // Agregar listener al montar el componente
    document.addEventListener('click', handleGlobalClick, true);
    
    // Eliminar listener al desmontar
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
    };
  }, []);

  // Obtener eventos para una fecha específica
  const getListData = (value) => {
    if (!value || !value.format) {
      return [];
    }
    const formattedDate = value.format('YYYY-MM-DD');
    if (!eventos || !Array.isArray(eventos)) {
      return [];
    }
    const listData = eventos
      .filter(evento => {
        if (!evento.dateEvent) return false;
        const eventoDate = dayjs(evento.dateEvent).format('YYYY-MM-DD');
        return eventoDate === formattedDate;
      })
      .map(evento => ({
        ...evento,
        type: 'success',
        content: evento.nameEvent,
        description: evento.descriptionEvent
      }));
    return listData;
  };

  const handleCloseCrearEvento = (data, hasChanges) => {
    setIsModalView(false);
    if (hasChanges) {
      fetchEventos();
    }
  };

  const handleCloseModificarEvento = (data, hasChanges) => {
    setIsModificarEventoVisible(false);
    setSelectedEvento(null);
    if (hasChanges) {
      fetchEventos();
    }
  };

  // Versión modificada que respeta el estado disableSelect
  const handleDateSelect = (value) => {
    if (value && !disableSelect) {
      setSelectedDate(value);
      setIsEventosDiaModalVisible(true);
    }
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const listData = getListData(current);
      return (
        <ul className="events">
          {listData.map((item, index) => (
            <li key={index} title={item.description}>
              <Badge status="success" text={item.content} />
            </li>
          ))}
        </ul>
      );
    }
    return info.originNode;
  };

  const handleEliminarEvento = async (evento) => {
    try {
      await fetch(`http://localhost:3000/api/eventos/${evento.id}`, {
        method: 'DELETE'
      });
      message.success('Evento eliminado exitosamente');
      fetchEventos();
      setIsEventosDiaModalVisible(false);
    } catch (error) {
      console.error('Error al eliminar:', error);
      message.error('No se pudo eliminar el evento');
    }
  };

  // Configuración actualizada para el menú desplegable en versiones recientes de Ant Design
  const dropdownItems = [
    {
      key: 'edit',
      label: 'Modificar',
      onClick: (evento) => {
        setSelectedEvento(evento);
        setIsModificarEventoVisible(true);
        setIsEventosDiaModalVisible(false);
      }
    },
    {
      key: 'delete',
      label: 'Eliminar',
      onClick: (evento) => handleEliminarEvento(evento)
    }
  ];

  return (
    <div className="eventos_container" ref={containerRef}>
      <div className="title-container-evento">
        <h1 className='title_event'>Eventos</h1>
        <button 
          className='btn-crear-evento' 
          onClick={() => setIsModalView(true)}
        >
          Crear evento
        </button>
        
        {isModalView && (
          <CrearEvento 
            onClose={handleCloseCrearEvento}
          />
        )}
      </div>

      <Calendar 
        cellRender={cellRender} 
        className='calendar_container'
        onSelect={handleDateSelect}
      />

      {/* Modal de eventos del día - propiedades actualizadas */}
      <Modal
        title={`Eventos para el ${selectedDate ? dayjs(selectedDate).format('DD/MM/YYYY') : ''}`}
        open={isEventosDiaModalVisible}
        onCancel={() => setIsEventosDiaModalVisible(false)}
        footer={null}
        width={400}
        style={{ zIndex: 1000 }}
        // No usar maskStyle 
      >
        {selectedDate && getListData(selectedDate).length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={getListData(selectedDate)}
            renderItem={(evento) => (
              <List.Item
                actions={[
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'edit',
                          label: 'Modificar',
                          onClick: () => {
                            setSelectedEvento(evento);
                            setIsModificarEventoVisible(true);
                            setIsEventosDiaModalVisible(false);
                          }
                        },
                        {
                          key: 'delete',
                          label: 'Eliminar',
                          onClick: () => handleEliminarEvento(evento)
                        }
                      ]
                    }}
                    trigger={['click']}
                  >
                    <MoreOutlined />
                  </Dropdown>
                ]}
              >
                <List.Item.Meta
                  title={evento.nameEvent}
                  description={evento.descriptionEvent}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty 
            description="No hay eventos programados para este día" 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
          />
        )}
      </Modal>

      {/* Modal para modificar evento */}
      <ModificarEvento
        visible={isModificarEventoVisible}
        evento={selectedEvento}
        onClose={handleCloseModificarEvento}
        style={{ zIndex: 1000 }} // En lugar de zIndex directo
      />
    </div>
  );
};