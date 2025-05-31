import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Alert, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//expiration dropdown menu
const expirationOptions = [
  { value: '1d', label: '1 day' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
];

export default function ShortenUrlModal({ open, onClose, onSubmit, error }) {
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [expiration, setExpiration] = useState('1d');

  // Handle the form submission
  const handleSubmit = () => {
    const daysMap = {
      '1d': 1,
      '7d': 7,
      '30d': 30,
    };

    const daysToAdd = daysMap[expiration] || 1; 

    const expiresAtDate = new Date();
    expiresAtDate.setDate(expiresAtDate.getDate() + daysToAdd);

    const expiresAtStr = expiresAtDate.toISOString().slice(0, 19);

    // Call the onSubmit function
    onSubmit({
      longUrl: longUrl,
      expiration: expiresAtStr,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Shorten a URL
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="Long URL"
          placeholder="Enter your long URL"
          fullWidth
          margin="normal"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          required
        />
        <TextField
          label="Custom Alias (optional)"
          placeholder="Custom alias"
          fullWidth
          margin="normal"
          value={alias}
          onChange={e => setAlias(e.target.value)}
        />
        <TextField
          select
          label="Expiration"
          value={expiration}
          onChange={e => setExpiration(e.target.value)}
          fullWidth
          margin="normal"
        >
          {expirationOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{
    bgcolor: 'black',
    color: 'white',
    '&:hover': {
      bgcolor: '#333',
    },
  }}>Shorten URL</Button>
      </DialogActions>
    </Dialog>
  );
}
