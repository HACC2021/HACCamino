import { updatedTypes } from '../../api/utilities/utilities';

export const getCreator = (creator) => (creator === 'general-public' ?
  'An observer (general public)' : creator);

export const getListItems = (update) => {
  if (update.updatedType === updatedTypes.createReport) {
    return {
      icon: 'add',
      header: `${getCreator(update.creator)} submitted this report`,
      description: update.date.toLocaleString(),
    };
  }
  if (update.updatedType === updatedTypes.appendReport) {
    return {
      icon: 'edit',
      header: `${getCreator(update.creator)} consolidated related reports`,
      description: update.date.toLocaleString(),
    };
  }
  if (update.updatedType === updatedTypes.updateReport) {
    return {
      icon: 'edit',
      header: `${getCreator(update.creator)} updated this report`,
      description: update.date.toLocaleString(),
    };
  }
  if (update.updatedType === updatedTypes.reviewReport) {
    return {
      icon: 'check',
      header: `${getCreator(update.creator)} reviewed this report`,
      description: update.date.toLocaleString(),
    };
  }
  return null;
};
