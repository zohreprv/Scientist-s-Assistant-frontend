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
        document.querySelectorAll('form').forEach((form) => form.reset());
        document.querySelectorAll('.scrollbar-custom').forEach((element) => {
          element.scrollTop = 0;
        });
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
      className={`modal-overlay ${isModalOpen ? '' : 'hidden'} max-w-2/3 lg:max-w-md z-12`}
      ref={componentRef}
    >
      {children}
    </div>
  );
};

export default Modal;
