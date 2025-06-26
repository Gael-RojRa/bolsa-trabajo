import React, { useState } from 'react';
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
  IonAlert
} from '@ionic/react';
import { createOffer } from '../../../shared/services/recruiterService';

interface CreateOfferFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateOfferForm: React.FC<CreateOfferFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    workingHours: '',
    location: '',
    company_name: '',
    company_logo: 'https://ionicframework.com/docs/img/demos/card-media.png' // Default logo
  });
  
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
      setShowLoading(true);
      await createOffer(formData);
      setShowLoading(false);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error al crear la oferta:', error);
      setShowLoading(false);
      setAlertMessage('Error al crear la oferta. Intenta nuevamente.');
      setShowAlert(true);
    }
  };
  
  const workingHoursOptions = ['Tiempo completo', 'Medio tiempo', 'Por proyecto', 'Freelance', 'Pasantía'];
  
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={onClose}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Crear Nueva Oferta de Empleo</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose}>Cancelar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="ion-padding">
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
                <IonLabel position="stacked">Ubicación</IonLabel>
                <IonInput
                  name="location"
                  value={formData.location}
                  onIonChange={handleChange}
                  placeholder="Ej: Ciudad, País o Remoto"
                ></IonInput>
              </IonItem>
              
              <div className="ion-padding-top">
                <IonButton expand="block" type="submit" color="primary">
                  Publicar Oferta
                </IonButton>
              </div>
            </IonList>
          </form>
        </IonContent>
      </IonModal>
      
      <IonLoading
        isOpen={showLoading}
        message={'Publicando oferta...'}
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

export default CreateOfferForm;
