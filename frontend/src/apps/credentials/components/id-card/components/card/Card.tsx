import React from 'react';

const Card: React.FC<{id: VerifiableId}> = ({ id }) => <p>{JSON.stringify(id)}</p>;

export default Card;
