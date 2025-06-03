import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSpinner,
  } from '@ionic/react';
  import { listOffers, Offer } from '../api/offer';
  import { useEffect, useState } from 'react';
  import { useHistory } from 'react-router';
  
  const OffersList: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const history = useHistory();
  
    const loadData = async (newPage = 1) => {
      const res = await listOffers(newPage);
      setOffers(prev => [...prev, ...res.data]);
      setHasMore(res.next_page_url !== null);
      setPage(newPage);
    };
  
    useEffect(() => {
      loadData();
    }, []);
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ofertas</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          <IonList>
            {offers.map(of => (
              <IonItem
                key={of.id}
                button
                onClick={() => history.push(`/offers/${of.id}`)}
              >
                <IonLabel>
                  <h2>{of.title}</h2>
                  <p>{of.company_name}</p>
                  <p>{of.location}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
  
          <IonInfiniteScroll
            onIonInfinite={e => {
              loadData(page + 1).finally(() => (e.target as any).complete());
            }}
            threshold="100px"
            disabled={!hasMore}
          >
            <IonInfiniteScrollContent loadingSpinner="bubbles" />
          </IonInfiniteScroll>
  
          {!hasMore && offers.length === 0 && (
            <div className="ion-text-center">
              <IonSpinner />
            </div>
          )}
        </IonContent>
      </IonPage>
    );
  };
  
  export default OffersList;
  