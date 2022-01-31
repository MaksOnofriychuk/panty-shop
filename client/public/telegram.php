<?php

//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "5012236045:AAEqyIj59jlOZBdskK-58_hcxoy0lAjhD-4";

//Сюда вставляем chat_id
$chat_id = "-783337849";

//Определяем переменные для передачи данных из нашей формы
if ($_POST['act'] == 'order') {
    $name = ($_POST['name']);
    $phone = ($_POST['phone']);
    $instagram = ($_POST['instagram']);
    $secondName = ($_POST['secondName']);
    $region = ($_POST['region']);
    $town = ($_POST['town']);
    $postOffice = ($_POST['postOffice']);
    $note = ($_POST['note']);


//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'Имя:' => $name,
        'phone:' => $phone,
        'instagram:' => $instagram,
        'secondName:' => $secondName,
        'region:' => $region,
        'town:' => $town,
        'postOffice:' => $postOffice,
        'note:' => $note
    );

//Настраиваем внешний вид сообщения в телеграме
    foreach($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    };

//Передаем данные боту
    $sendToTelegram = fopen('https://api.telegram.org/bot${$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}',"r");

//Выводим сообщение об успешной отправке
    if ($sendToTelegram) {
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
    }

//А здесь сообщение об ошибке при отправке
    else {
        alert('Что-то пошло не так. ПОпробуйте отправить форму ещё раз.');
    }
}

?>
