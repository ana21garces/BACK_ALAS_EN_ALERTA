import axios from 'axios';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('nombre_ave', nombreAve);
  formData.append('lugar_avistamiento', lugarAvistamiento);
  formData.append('fecha_avistamiento', fechaAvistamiento);
  formData.append('imagen', selectedFile);  // archivo de imagen

  try {
    const token = localStorage.getItem('token');  

    const response = await axios.post('/crear-registro', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log('Avistamiento registrado:', response.data);
  } catch (err) {
    console.error('Error registrando avistamiento:', err);
  }
};