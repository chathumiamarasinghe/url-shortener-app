import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Select, MenuItem, InputAdornment, TablePagination, Box, Button, Typography
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';

export default function UrlTable({
  urls, onEdit, onDelete, onNewUrl, sortBy, setSortBy
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Base URL for constructing short URLs
  const BASE_URL = "http://localhost:8080/api/url/";

  // Map raw URLs
  const mappedUrls = useMemo(() => {
    if (!urls) return [];
    return urls.map(url => ({
      id: url.id,
      shortUrl: BASE_URL + url.shortCode,
      longUrl: url.originalUrl,
      clicks: url.clicks ?? 0,
      createdAt: url.createdAt,
      expirationDate: url.expiresAt,
      active: url.active,
    }));
  }, [urls]);

  // Filter and sort URLs
  const filteredUrls = useMemo(() => {
    let filtered = mappedUrls;
    if (search) {
      filtered = filtered.filter(
        url =>
          url.shortUrl.toLowerCase().includes(search.toLowerCase()) ||
          url.longUrl.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === 'Date Created') {
      filtered = filtered.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return filtered;
  }, [mappedUrls, search, sortBy]);

  // Paginate the filtered URLs
  const paginatedUrls = useMemo(
    () => filteredUrls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredUrls, page, rowsPerPage]
  );

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 2,
        bgcolor: '#f5f5f5',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 1100,
          p: 3,
          boxSizing: 'border-box',
        }}
      >
        
        <Typography
          variant="h5"
          component="h1"
          mb={3}
          textAlign="center"
          fontWeight="bold"
        >
          URL Shortner
        </Typography>

        
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'center' }}
          mb={2}
          gap={2}
        >
          <TextField
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: 300 } }}
            size="small"
          />
          <Box
            display="flex"
            gap={1}
            flexWrap="wrap"
            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          >
            <Select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="Date Created">Date Created</MenuItem>
            </Select>
            <Button variant="contained" onClick={onNewUrl}>+ New URL</Button>
          </Box>
        </Box>

        {/* Table details */}
        <TableContainer
          sx={{
            maxHeight: 440,
            overflowX: 'auto',
            width: '100%',
          }}
        >
          <Table
            stickyHeader
            aria-label="URLs table"
            sx={{
              minWidth: 650,
              width: '100%',
              tableLayout: 'auto',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Expiration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUrls.map(url => (
                <TableRow key={url.id}>
                  <TableCell>
                    <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                      {url.shortUrl}
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      href={url.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ wordBreak: 'break-word' }}
                    >
                      {url.longUrl}
                    </a>
                  </TableCell>
                  <TableCell>{url.clicks}</TableCell>
                  <TableCell>{url.createdAt ? new Date(url.createdAt).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{url.expirationDate ? new Date(url.expirationDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(url)} size="small"><Edit /></IconButton>
                    <IconButton onClick={() => onDelete(url.id)} size="small"><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedUrls.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

         {/* Pagination controls */}
        <TablePagination
          component="div"
          count={filteredUrls.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ mt: 2 }}
        />
      </Paper>
    </Box>
  );
}
