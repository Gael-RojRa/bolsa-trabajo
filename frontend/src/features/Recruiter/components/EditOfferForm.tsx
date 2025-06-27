import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonLoading,
  IonAlert,
  IonIcon
} from '@ionic/react';
import { createOutline } from 'ionicons/icons';
import { getOfferDetail, updateOffer, getLocations } from '../../../shared/services/recruiterService';

// Interfaz para la oferta a editar
interface Offer {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  salary: number | string;
  workingHours?: string;
  location_id: number;
}

// Interfaz para el envío del formulario
interface OfferSubmitData {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  salary: string;
  workingHours?: string;
  location_id: number;
}

interface EditOfferFormProps {
  isOpen: boolean;
  offerId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EditOfferForm: React.FC<EditOfferFormProps> = ({ isOpen, offerId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<Offer>({
    id: 0,
    title: '',
    description: '',
    requirements: '',
    salary: '',
    workingHours: '',
    location_id: 0
  });
  
  const [locations, setLocations] = useState<any[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Cargar los datos de la oferta cuando se abre el modal y se tiene un ID válido
    if (isOpen && offerId) {
      loadOfferDetails(offerId);
    }
    if (isOpen) {
      getLocations()
        .then(data => {
          setLocations(data);
          console.log('Loaded locations:', data.length);
        })
        .catch(err => console.error('Error cargando ubicaciones', err));
    }
  }, [isOpen, offerId]);
  
  const loadOfferDetails = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await getOfferDetail(id);
      console.log('Datos recibidos:', response);
      
      // Verificar si la respuesta contiene los datos esperados
      const offerData = response.data || response;
      
      if (!offerData || !offerData.id) {
        throw new Error('Formato de datos inesperado');
      }
      
      setFormData({
        id: offerData.id,
        title: offerData.title || '',
        description: offerData.description || '',
        requirements: offerData.requirements || '',
        salary: offerData.salary || 0,
        workingHours: offerData.working_hours || offerData.workingHours || '',
        location_id: offerData.location_id || 0
      });
      
      console.log('Formulario actualizado con datos:', offerData);
    } catch (error: any) {
      console.error('Error al cargar los detalles de la oferta:', error);
      setAlertMessage(`Error al cargar los datos de la oferta: ${error.message || 'Error desconocido'}`);
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: any) => {
    const name = e.target?.name;
    const value = e.detail?.value ?? e.target?.value;
    if (!name) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.title || !formData.description || !formData.salary) {
      setAlertMessage('Por favor completa los campos obligatorios (Título, Descripción y Salario)');
      setShowAlert(true);
      return;
    }
    
    try {
      // Asegurar que el salario sea un número para el backend
      let salaryValue: number;
      if (typeof formData.salary === 'string') {
        salaryValue = parseFloat(formData.salary.replace(/[^0-9.-]+/g, ''));
        if (isNaN(salaryValue)) {
          throw new Error('El salario debe ser un número válido');
        }
      } else {
        salaryValue = formData.salary;
      }
      
      // Crear objeto con tipado correcto para enviar
      const submitData: OfferSubmitData = {
        id: formData.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        requirements: formData.requirements?.trim() || '',
        salary: salaryValue.toString(), // Asegurar que sea string como espera la API
        workingHours: formData.workingHours?.trim() || '',
        location_id: formData.location_id
      };
      
      console.log('Enviando datos al servidor:', submitData);
      setShowLoading(true);
      
      await updateOffer(submitData.id, submitData);
      
      setShowLoading(false);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error al actualizar la oferta:', error);
      setShowLoading(false);
      setAlertMessage(`Error al actualizar la oferta: ${error.message || 'Intenta nuevamente.'}`);
      setShowAlert(true);
    }
  };
  
  const workingHoursOptions = ['Tiempo completo', 'Medio tiempo', 'Por proyecto', 'Freelance', 'Pasantía'];
  
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Editar Oferta de Empleo</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>Cancelar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="ion-padding">
          {isLoading ? (
            <div className="ion-text-center ion-padding">
              <IonLoading isOpen={isLoading} message={'Cargando datos...'} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Título de la Oferta *</IonLabel>
                  <IonInput
                    name="title"
                    value={formData.title}
                    onIonChange={handleChange}
                    required
                    placeholder="Ej: Desarrollador Frontend React"
                  ></IonInput>
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Descripción Detallada *</IonLabel>
                  <IonTextarea
                    name="description"
                    value={formData.description}
                    onIonChange={handleChange}
                    required
                    placeholder="Describe los detalles de la posición y responsabilidades"
                    rows={4}
                  ></IonTextarea>
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Requisitos</IonLabel>
                  <IonTextarea
                    name="requirements"
                    value={formData.requirements}
                    onIonChange={handleChange}
                    placeholder="Lista los requisitos para postular"
                    rows={3}
                  ></IonTextarea>
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Salario Mensual *</IonLabel>
                  <IonInput
                    name="salary"
                    value={formData.salary}
                    onIonChange={handleChange}
                    required
                    placeholder="Ej: 1200"
                    type="number"
                  ></IonInput>
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Jornada Laboral</IonLabel>
                  <IonSelect
                    name="workingHours"
                    value={formData.workingHours}
                    onIonChange={handleChange}
                    placeholder="Selecciona el tipo de jornada"
                  >
                    {workingHoursOptions.map(option => (
                      <IonSelectOption key={option} value={option}>
                        {option}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Ubicación *</IonLabel>
                  <IonSelect
                    value={formData.location_id}
                    placeholder="Selecciona ubicación"
                    onIonChange={(e)=> setFormData({...formData, location_id: e.detail.value})}
                  >
                    {locations.map(loc => (
                      <IonSelectOption key={loc.id} value={loc.id}>
                        {loc.city}, {loc.country}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                
                <div className="ion-padding-top">
                  <IonButton expand="block" type="submit" color="primary">
                    Guardar Cambios
                  </IonButton>
                </div>
              </IonList>
            </form>
          )}
        </IonContent>
      </IonModal>
      
      <IonLoading
        isOpen={showLoading}
        message={'Guardando cambios...'}
      />
      
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Atención'}
        message={alertMessage}
        buttons={['Aceptar']}
      />
    </>
  );
};

export default EditOfferForm;
