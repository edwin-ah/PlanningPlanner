import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function useActivitiesList(db, status) {
  const [activitiesList, setActivitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "activities"), where("status", "==", status));

    const unsubscribe = onSnapshot(q, snapshot => {
      setActivitiesList(
        snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description
        }))
      );
      setIsLoading(false);
    });

    return unsubscribe;
  }, [db, status]);

  return { activitiesList, isLoading };
};