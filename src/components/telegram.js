// Ваш React-код, например, в компоненте UserInfoForm.js

const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('productType', productType);
    formData.append('brand', brand);
    formData.append('product', product);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('shipping', shipping);
    formData.append('amount', amount);
  
    try {
      const response = await fetch('path/to/your/mail.php', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Успешный ответ от сервера
        const result = await response.text();
        alert(result);
      } else {
        // Обработка ошибок
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
    }
  };
  