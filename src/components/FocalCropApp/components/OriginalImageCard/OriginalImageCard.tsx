/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @shopify/jsx-no-hardcoded-content */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import {Card} from '@shopify/polaris';


import './OriginalImageCard.css';
import {FocalImage} from '../../objects';
import {FocalPoint} from '../../types';

export interface OriginalImageCardProps {
  image?: FocalImage;
  setModalOpen: (open: boolean) => void;
  updateImage: (focalPoint: FocalPoint) => void;
}

export function OriginalImageCard({image, setModalOpen, updateImage}: OriginalImageCardProps) {
  if (!image) {
    return <></>;
  }

  const focalPointStyle = {
    left: `${image.focalPoint.x / image.width * 100}%`,
    top: `${image.focalPoint.y / image.height * 100}%`,
  };

  const updateFocalPoint = (event: React.MouseEvent<HTMLImageElement>) => {
    const nativeEvent = event.nativeEvent;
    const {offsetX, offsetY} = nativeEvent;
    const {offsetWidth, offsetHeight} = nativeEvent.target as HTMLImageElement;

    const left = Math.round(offsetX / offsetWidth * image.width);
    const top = Math.round(offsetY / offsetHeight * image.height);

    updateImage({x: left, y: top, zoom: image.focalPoint.zoom});
  };


  const openImageModalAction = {
    content: 'Change Image',
    onAction: () => {
      setModalOpen(true);
    },
  };

  const cardMarkup = image ? <><Card.Section>
  <div className="original-image-container">
    <span className="focal-point" style={focalPointStyle} />
    <img className="original-image" src={image.url} alt={image.key} onClick={updateFocalPoint} />
  </div>
</Card.Section>
<Card.Section>
  <p><b>Width</b>: {image.width}px <b>Height</b>: {image.height}px</p>
</Card.Section></> : <Card.Section>No Image Selected</Card.Section>;

  return <Card title="Original Image" actions={[openImageModalAction]}>
          {cardMarkup}
        </Card>;
}
