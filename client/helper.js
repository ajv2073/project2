const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('entryMessage').classList.remove('hidden');
  };

const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    document.getElementById('entryMessage').classList.add('hidden');
  
    if(result.redirect) {
      window.location = result.redirect;
    }
  
    if(result.error) {
      handleError(result.error);
    }

    if (handler) {
        handler(result);
    }
  };

const returnDay = (number) => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[number];
}

const returnMonth = (number) => {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[number];
}

const hideError = () => {
    document.getElementById('entryMessage').classList.add('hidden');
  };

module.exports = {
    handleError,
    sendPost,
    hideError,
    returnDay,
    returnMonth,
};
