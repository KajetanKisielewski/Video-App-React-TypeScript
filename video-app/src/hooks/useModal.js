import React from 'react';
import VideoModal from '../components/Modal/Modal';

const useModal = () => {
    const [visible, setVisible] = React.useState(false);
    const [content, setContent] = React.useState(null);

    const showModal = () => setVisible(true);

    const closeModal = () => setVisible(false);

    const renderModalContent = () =>
        visible ? <VideoModal content={content} closeModal={closeModal} /> : null;

    return [showModal, closeModal, renderModalContent, setContent];
};

export default useModal;
