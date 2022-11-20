import * as React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

import { ISlideItem } from '../../types/slide';
import { setElementBackground } from '../../helpers/ui';
import { HiddenSubmit } from '../HiddenSubmit/HiddenSubmit';
import EditIconModal from '../../containers/modals/EditIconModal/EditIconModal';

import styles from './SlideItem.module.scss';

const ItemForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 300px;
  border: 1px solid transparent;
  padding: 10px;
  margin: 0 auto;

  &:hover {
    border: 1px dashed gray;
    cursor: grab;
  }
`;

const ItemIcon = styled.div`
  font-size: 60px;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const DragIcon = styled.div`
  font-size: 20px;
  transition: font-size ease-in-out 0.2s;

  &:hover {
    font-size: 30px;
  }
`;

export interface ISlideItemProps extends ISlideItem {
  onDrag?: (id: string) => void;
  onDrop?: (id: string) => void;
  onSave?: (item: ISlideItem) => void;
}

const SlideItem: React.FC<ISlideItemProps> = ({
  id,
  icon,
  title,
  description,
  onDrag,
  onDrop,
  onSave,
}) => {
  const titleRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const descriptionRef =
    React.useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const [itemIcon, setItemIcon] = React.useState<string>(icon);
  const [isIconsModalOpened, setIsIconsModalOpened] =
    React.useState<boolean>(false);
  const [isSlideHovering, setIsSlideHovering] = React.useState<boolean>(false);

  const DragIndicator = React.useMemo(
    () => () => {
      if (!isSlideHovering) {
        return null;
      }
      return (
        <DragIcon className={cn('material-icons', styles.dragItem)}>
          drag_indicator
        </DragIcon>
      );
    },
    [isSlideHovering]
  );

  const handleSave = React.useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      if (onSave) {
        onSave({
          icon: itemIcon,
          id,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
        });
      }
    },
    [onSave, id, itemIcon]
  );

  const handleDragStart = React.useCallback(() => {
    if (onDrag) {
      onDrag(id);
    }
  }, [id, onDrag]);

  const handleDragEnd = React.useCallback(
    (e: React.DragEvent<HTMLFormElement>) => {
      e.preventDefault();
      setElementBackground(e.currentTarget, 'transparent');
    },
    []
  );

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLFormElement>) => {
      e.preventDefault();
      setElementBackground(e.currentTarget, '#EAEAEA');
    },
    []
  );

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLFormElement>) => {
      e.preventDefault();
      setElementBackground(e.currentTarget, 'transparent');
    },
    []
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLFormElement>) => {
      e.preventDefault();
      setElementBackground(e.currentTarget, 'transparent');
      if (onDrop) {
        onDrop(id);
      }
    },
    [id, onDrop]
  );

  return (
    <React.Fragment>
      <ItemForm
        draggable
        id={id}
        onSubmit={handleSave}
        onBlur={handleSave}
        onMouseEnter={() => setIsSlideHovering(true)}
        onMouseLeave={() => setIsSlideHovering(false)}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <ItemIcon
          className="material-icons"
          onClick={() => setIsIconsModalOpened(true)}
        >
          {itemIcon}
        </ItemIcon>
        <TextareaAutosize
          name="title"
          aria-label="empty textarea"
          defaultValue={title}
          placeholder="Insert a text"
          className={styles.title}
          ref={titleRef}
        />
        <TextareaAutosize
          name="description"
          aria-label="empty textarea"
          defaultValue={description}
          placeholder="Add here your additional text"
          className={styles.description}
          ref={descriptionRef}
        />
        <HiddenSubmit />
        <DragIndicator />
      </ItemForm>
      <EditIconModal
        activeIcon={itemIcon}
        id={id}
        title="Choose Icon"
        isOpened={isIconsModalOpened}
        onClose={() => setIsIconsModalOpened(false)}
        onSelect={(icon) => setItemIcon(icon)}
      />
    </React.Fragment>
  );
};

export default SlideItem;
