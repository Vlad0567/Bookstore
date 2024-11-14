import React from 'react';
import vkiconIcon from "../../assets/vk.svg";
import odnoklasnikiIcon from "../../assets/odnoklasniki.svg";
import youtubeIcon from "../../assets/youtube.svg";
import tiktokIcon from "../../assets/tiktok.svg";
import telegramIcon from "../../assets/telegram.svg";
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div>
            <h3>Книжный интернет-магазин «Bookzone»</h3>
            <p>«Bookzone» – пример сайта по продаже книг. На информационном ресурсе применяются рекомендательные технологии.</p>
            <div className="social-icons">
              <a href="#"><img src={vkiconIcon} alt="VK" /></a>
              <a href="#"><img src={odnoklasnikiIcon} alt="Odnoklassniki" /></a>
              <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
              <a href="#"><img src={tiktokIcon} alt="TikTok" /></a>
              <a href="#"><img src={telegramIcon} alt="Telegram" /></a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <div>
            <h3>В наших магазинах</h3>
            <p>Адреса магазинов</p>
            <p>Наши партнёры</p>
            <p>О компании</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024, Bookzone</p>
        <p>Правила продажи</p>
        <p>Политика конфиденциальности</p>
      </div>
    </footer>
  );
};

export default Footer;
