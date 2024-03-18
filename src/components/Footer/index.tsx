import React from 'react';
import styles from "../../pages/Main/main.module.scss";
import { CreatedLogo, Logo, VkIcon } from "../../icons";
import { Link } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { formatPhoneNumber } from '../../utils/forms/formatePhone';
import useTheme from '../../hooks/useTheme';

const Footer = () => {
    const { phone } = useAppSelector(state => state.main)
    const gTheme = useTheme()

    return (
        <footer className={`${styles.footer} ${gTheme("lt-light-black-bg", "dk-gray-bg")} pd-40-0`}>
            <div className="wrapper">
                <div className={`${styles.block} gap-40 f-column`}>
                    <nav className={"d-f jc-between flex-wrap"}>
                        <div className={`${styles.navColumn} ${styles.navLogoColumn} f-column gap-10`}>
                            <Link to={"/"}>
                                <Logo className={styles.logo} />
                            </Link>

                            <Link className={styles.navItem} to={"/empty"}>О нас</Link>
                        </div>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <b className={styles.navItem}>Работа</b>
                            <Link className={styles.navItem} to={"/empty"}>В Гулякин <br /> Фудхолл</Link>
                            <Link className={styles.navItem} to={"/empty"}>В Гуленьки <br /> Пельменная</Link>
                            <Link className={styles.navItem} to={"/empty"}>В iFood</Link>
                            <Link className={styles.navItem} to={"/empty"}>В Воробушек</Link>
                            <Link className={styles.navItem} to={"/empty"}>В Gusto</Link>
                            <Link className={styles.navItem} to={"/empty"}>В Креветочная</Link>
                            <Link className={styles.navItem} to={"/empty"}>В Гулибули</Link>
                        </div>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <b className={styles.navItem}>Партнёрам</b>
                            <Link className={styles.navItem} to={"/empty"}>Инвестиции</Link>
                            <Link className={styles.navItem} to={"/empty"}>Поставщикам</Link>
                            <Link className={styles.navItem} to={"/empty"}>Предложить помещение</Link>
                        </div>
                        <div className={`${styles.navColumn} f-column gap-10`}>
                            <b className={styles.navItem}>Документы</b>
                            <Link className={styles.navItem} to={"/empty"}>Политика конфиденциальности</Link>
                            <Link className={styles.navItem} to={"/public-selling"}>Публичная оферта</Link>
                            <Link className={styles.navItem} to={"/user-document"}>Пользовательское соглашение</Link>
                            <Link className={styles.navItem} to={"/empty"}>Соглашение на обработку ПД</Link>
                            <Link className={styles.navItem} to={"/empty"}>Правила программы лояльности</Link>
                        </div>
                        <div className={`${styles.navColumn} ${styles.navColumnContacts} f-column gap-10`}>
                            <b className={styles.navItem}>Контакты</b>
                            <a className={styles.navItem} href="mailto:gm.group@internet.ru">gm.group@internet.ru</a>
                            <a className={styles.navItem} href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>
                            <div className={`${styles.socials} d-f gap-10`}>
                                <a target={"_blank"} href="https://vk.com/gulyakin86" className={`${styles.item} f-c-col`}>
                                    <VkIcon />
                                </a>
                            </div>
                        </div>
                    </nav>
                    <div className="f-row-betw flex-wrap gap-20">
                        <div className={styles.copyright}>
                            <p> © 2023 ООО «ГМ ГРУПП»</p>
                            <p>ОГРН 1228600002025, ИНН 8606018000</p>
                            <p> 628405, Ханты-Мансийский Автономный округ - Югра, г Сургут, Комсомольский пр-кт, д 19, офис 105</p>
                        </div>
                        <div className={styles.created}>
                            <p>Создание сайта</p>
                            <a target={"_blank"} href="https://vk.com/vspodosenov">
                                <CreatedLogo />
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;