import useGlobalSnackbar from '@/hooks/app/useGlobalSnackbar';

import styles from './styles.module.scss';

const Snackbar: React.FC = () => {
  const { message, type } = useGlobalSnackbar();
  const snackbarType = () => {
    switch (type) {
      case 'success':
        return 'bg-[#40B01E]';

      case 'info':
        return 'bg-[#0083C1]';

      case 'alert':
        return 'bg-[#E3930F]';

      default:
        return 'bg-error';
    }
  };

  if (type && message) {
    return (
      <div
        className={`
        !z-[51] fixed
        bottom-[-48px]
        px-3
        md:grid grid-cols-6
        lg:w-[calc(100vw-280px)] w-full
        lg:left-[280px]
        ${styles['global-snackbar']}
      `}
      >
        <div
          className={`
          text-xs md:text-sm 
          text-white
          rounded-xl shadow-lg
          flex justify-between
          p-3 !z-50
          md:col-start-2 md:col-span-4
          ${snackbarType()}
        `}
        >
          <span>{message}</span>
        </div>
      </div>
    );
  }
  return '';
};

export default Snackbar;
