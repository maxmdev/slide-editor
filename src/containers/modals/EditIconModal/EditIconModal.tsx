import * as React from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import ModalContainer, { IModalContainerProps } from '../ModalContainer';
import { sampleIcons } from '../../../mocks/icons';

import styles from './EditIconModal.module.scss';

const ItemIcon = styled.div`
  font-size: 60px;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export interface IEditIconModalProps
  extends Omit<IModalContainerProps, 'children'> {
  activeIcon: string;
  icons?: string[];
  onSelect?: (icon: string) => void;
}

const EditIconModal: React.FC<IEditIconModalProps> = ({
  id,
  activeIcon,
  icons = sampleIcons,
  onSelect,
  onClose,
  isOpened,
}) => {
  const handleSelectIcon = React.useCallback(
    (icon: string) => {
      if (onSelect && icon !== activeIcon) {
        return onSelect(icon);
      }
    },
    [onSelect]
  );

  return (
    <ModalContainer
      title="Choose icon"
      id={id}
      isOpened={isOpened}
      onClose={onClose}
    >
      <div className={styles.iconsContainer}>
        {icons.map((icon) => (
          <ItemIcon
            className={cn('material-icons', styles.icon, {
              [styles.selectedIcon]: icon === activeIcon,
            })}
            key={icon}
            onClick={() => handleSelectIcon(icon)}
          >
            {icon}
          </ItemIcon>
        ))}
      </div>
    </ModalContainer>
  );
};

export default EditIconModal;
