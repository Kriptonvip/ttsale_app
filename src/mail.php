<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productType = $_POST['productType'];
    $brand = $_POST['brand'];
    $product = $_POST['product'];
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $shipping = $_POST['shipping'];
    $amount = $_POST['amount'];

    // Отправка уведомления на почту
    $to = 'kriptonych@gmail.com';
    $subject = 'Новый заказ';
    $message = "Тип товара: $productType\nБренд: $brand\nТовар: $product\nКоличество: $amount\nФИО: $fullName\nEmail: $email\nПочтовый адрес: $shipping\nТелефон: $phone";
    $headers = "From: kriptonych\r\nReply-To: kriptonych@gmail.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.";
    } else {
        echo "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.";
    }

    // Отправка уведомления в Telegram
    $telegramToken = '6711167319:AAH17g2PRkCip7fgUJeHC4RE5H2tcX4Dy-A';
    $telegramChatId = '351500702';
    $telegramMessage = "Новый заказ:\nТип товара: $productType\nБренд: $brand\nТовар: $product\nКоличество: $amount\nФИО: $fullName\nEmail: $email\nПочтовый адрес: $shipping\nТелефон: $phone";

    $telegramApiUrl = "https://api.telegram.org/bot$telegramToken/sendMessage";
    $telegramApiUrl .= "?chat_id=$telegramChatId&text=" . urlencode($telegramMessage);

    // Отправляем запрос к Telegram API
    file_get_contents($telegramApiUrl);
}
?>
