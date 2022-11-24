export function convertSnaps<T>(results) {
  return <T[]>results.docs.map((snap) => {
    return {
      id: snap.id,
      ...(<any>snap.data()),
    };
  });
}

export function convertSnap<T>(snap) {
  return <T>{
    id: snap.id,
    ...(<any>snap.data()),
  };
}
