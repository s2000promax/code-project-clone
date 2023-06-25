import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { Card } from '@/shared/uiKit/Card';
import { HStack, VStack } from '@/shared/uiKit/Stack';
import { Text } from '@/shared/uiKit/Text';
import { StarRating } from '@/shared/uiKit/StarRating';
import { ModalWindow } from '@/shared/uiKit/ModalWindow';
import { Input } from '@/shared/uiKit/Input';
import { Button, VariantButton } from '@/shared/uiKit/Button';
import { Drawer } from '@/shared/uiKit/Drawer/ui/Drawer';
import { SizeButton } from '@/shared/uiKit/Button/ui/Button';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  rate?: number;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = (props: RatingCardProps) => {
  const {
    className,
    onAccept,
    onCancel,
    title,
    feedbackTitle,
    rate = 0,
    hasFeedback,
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t('Your feedback')}
      />
    </>
  );

  return (
    <Card
      className={className}
      max
    >
      <VStack
        align="center"
        gap="8"
      >
        <Text title={starsCount ? t('Thanks for rating') : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>
      <BrowserView>
        <ModalWindow
          isOpen={isModalOpen}
          lazy
        >
          <VStack
            max
            gap="32"
          >
            {modalContent}
            <HStack
              max
              gap="16"
              justify="end"
            >
              <Button
                onClick={cancelHandle}
                variant={VariantButton.OUTLINE_RED}
              >
                {t('Close')}
              </Button>
              <Button onClick={acceptHandle}>{t('Send')}</Button>
            </HStack>
          </VStack>
        </ModalWindow>
      </BrowserView>
      <MobileView>
        <Drawer
          isOpen={isModalOpen}
          lazy
          onClose={cancelHandle}
        >
          <VStack gap="32">
            {modalContent}
            <Button
              fullWidth
              onClick={acceptHandle}
              size={SizeButton.L}
            >
              {t('Send')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
};
