import * as React from 'react';
import styled from 'styled-components';

import { ISlide, ISlideItem } from '../../types/slide';
import SlideItem from '../SlideItem/SlideItem';
import { HiddenSubmit } from '../HiddenSubmit/HiddenSubmit';
import TextareaAutosize from 'react-textarea-autosize';

import styles from './Slide.module.scss';

const SlidesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
`;

const SlideTitle = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slide: React.FC<ISlide> = ({ title, items }) => {
  const titleRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const [slideTitle, setSlideTitle] = React.useState<string | undefined>(title);
  const [slideItems, setSlideItems] = React.useState<ISlideItem[]>(items);
  const [draggableItem, setDraggableItem] = React.useState<
    number | undefined
  >();

  const handleDragItem = React.useCallback(
    (id: string) => {
      const draggedItemIndex = slideItems?.findIndex((item) => item.id === id);
      setDraggableItem(draggedItemIndex);
    },
    [slideItems]
  );

  const handleDropItem = React.useCallback(
    (id: string) => {
      const droppedItem = slideItems?.findIndex((item) => item.id === id);
      if (
        typeof draggableItem !== 'undefined' &&
        draggableItem !== droppedItem
      ) {
        const items = [...slideItems];
        items[droppedItem] = slideItems[draggableItem];
        items[draggableItem] = slideItems[droppedItem];

        setSlideItems(items);
        setDraggableItem(undefined);
      }
    },
    [draggableItem, slideItems]
  );

  const handleSaveItem = React.useCallback(
    (item: ISlideItem) => {
      const itemCandidateIndex = slideItems.findIndex(
        (slideItem) => slideItem.id === item.id
      );
      const items = [...slideItems];
      items[itemCandidateIndex] = item;

      setSlideItems(items);
    },
    [slideItems]
  );

  const handleSaveSlide = React.useCallback(() => {
    setSlideTitle(titleRef.current.value);
  }, []);

  const slideItemsMarkup = React.useMemo(() => {
    return slideItems?.map((slide) => {
      const { title, id } = slide;
      return (
        <SlideItem
          {...slide}
          key={title.concat(id)}
          onDrag={handleDragItem}
          onDrop={handleDropItem}
          onSave={handleSaveItem}
        />
      );
    });
  }, [slideItems, handleDragItem, handleDropItem, handleSaveItem]);

  return (
    <React.Fragment>
      <SlideTitle onSubmit={handleSaveSlide} onBlur={handleSaveSlide}>
        <TextareaAutosize
          name="slideTitle"
          aria-label="empty textarea"
          defaultValue={slideTitle}
          placeholder="Insert a title"
          className={styles.title}
          ref={titleRef}
        />
        <HiddenSubmit />
      </SlideTitle>
      <SlidesContainer>{slideItemsMarkup}</SlidesContainer>
    </React.Fragment>
  );
};

export default Slide;
