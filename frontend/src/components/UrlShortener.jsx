import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UrlTable from './UrlTable';
import ShortenUrlModal from './ShortenUrlModal';
import { setUrls, removeUrl, setLoading, setError, addUrl } from '../store/urlSlice';
import { urlService } from '../services/urlService';

export default function UrlShortener() {
  const dispatch = useDispatch();
  const { urls, loading, error } = useSelector((state) => state.urls);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Date Created');
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  // Fetch URLs from the backend
  const fetchUrls = async () => {
    try {
      dispatch(setLoading(true));
      const data = await urlService.getUrls();
      dispatch(setUrls(Array.isArray(data) ? data : []));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // Handle deleting a URL by its ID
  const handleDelete = async (id) => {
    try {
      await urlService.deleteUrl(id);
      dispatch(removeUrl(id));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleNewUrl = () => {
    setModalOpen(true);
    setModalError('');
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalError('');
  };

  const handleModalSubmit = async ({ longUrl, expiration }) => {
  if (!longUrl || !/^https?:\/\//.test(longUrl)) {
    setModalError('Please enter a valid URL');
    return;
  }
  try {
    dispatch(setLoading(true));
    const data = await urlService.shortenUrl(longUrl, expiration);
    dispatch(addUrl(data));
    setModalOpen(false);
  } catch (error) {
    setModalError(error.message);
  }
};


  return (
    <>
      <UrlTable
        urls={urls}
        onEdit={() => {}}
        onDelete={handleDelete}
        onNewUrl={handleNewUrl}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <ShortenUrlModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        error={modalError}
      />
    </>
  );
}