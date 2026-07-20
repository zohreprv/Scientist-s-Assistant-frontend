import { useEffect, useRef } from 'react';
const Modal = ({ isModalOpen, setIsModalOpen, children }) => {
  const componentRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  return (
    <div
      className={`modal-overlay ${isModalOpen ? '' : 'hidden'} max-w-sm lg:max-w-lg z-12`}
      ref={componentRef}
    >
      {children}
    </div>
  );
};

export default Modal;
