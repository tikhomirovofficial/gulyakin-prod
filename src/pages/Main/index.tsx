import React, { FC, useDeferredValue, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowMiniRightIcon, Geo } from "../../icons";
import styles from './main.module.scss'
import { getImgPath } from "../../utils/common/getAssetsPath";
import GrayBorderedBlock from "../../components/GrayBorderedBlock";
import GradientGrayBtn from "../../components/Buttons/GradientGrayButton";
import SearchInput from "../../components/Inputs/SearchInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { handleBooking } from "../../features/modals/modalsSlice";
import { getUser } from "../../features/profile/profileSlice";
import useAuth from "../../hooks/useAuth";
import useToken from "../../hooks/useToken";
import Preloader from "../../components/Preloader";
import { useInput } from "../../hooks/useInput";
import Catalog from "../../components/Catalog";
import Combo from "../../components/Catalog/Combo";
import { Link as ScrollLink } from "react-scroll"
import BookingWindow from '../../components/Windows/Booking';
import useTheme from '../../hooks/useTheme';

const Main: FC = () => {
    const { categories, products, main, modals } = useAppSelector(state => state)
    const is_auth = useAuth()
    const token = useToken()

    const dispatch = useAppDispatch()
    const sliderCategories = useRef<SwiperProps>(null)

    const [sliderNeeded, setSliderNeeded] = useState(false)
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [isEndSlider, setIsEndSlider] = useState(false)
    const gTheme = useTheme()
    const [searchVal, changeSearchVal, setSearchVal] = useInput("")
    const deferredSearch = useDeferredValue(searchVal)

    const handleNext = () => {
        sliderCategories.current.swiper.slideNext();
    }

    const handlePrev = () => {
        sliderCategories.current.swiper.slidePrev();
    }


    useEffect(() => {
        setCurrentSlide(0)
        setSliderNeeded(false)
        if (sliderCategories.current) {
            const slider = sliderCategories.current as HTMLDivElement
            const parentWidth = slider.parentElement?.parentElement?.offsetWidth

            if (parentWidth) {
                const sliderIsSmaller = slider.offsetWidth < parentWidth
                if (!sliderIsSmaller) {
                    setSliderNeeded(true)
                    setIsEndSlider(false)
                }
            }


        }
    }, [categories])

    useEffect(() => {
        if (token && !is_auth) {
            dispatch(getUser())
        }
    }, [])
    return (
        <>
            {/*<Sales/>*/}
            <div className={`${styles.main} f-column gap-20`}>
                <div className={`pd-30-0`}>
                    <div className={`${styles.block} f-column gap-25`}>
                        <div className="wrapper w-100p">
                            <div className={`${styles.restaurants} d-f jc-between gap-30`}>
                                <div className="left d-f gap-30">
                                    {
                                        main.isMobile ? null :
                                            <Link to={"/restaurants"}>
                                                <GradientGrayBtn
                                                    className={`${styles.btn} cur-pointer d-f al-center gap-10`}>
                                                    <Geo stroke={main.isDarkTheme ? "white" : "black"} />
                                                    <p>Рестораны на карте</p>
                                                </GradientGrayBtn>
                                            </Link>
                                    }

                                    <SearchInput
                                        value={searchVal}
                                        changeVal={changeSearchVal}
                                        setVal={setSearchVal}
                                        className={styles.search} />
                                </div>
                                <div className={`${styles.orderTrigger} f-1  p-rel`}>
                                    <div className="p-abs w-100p h-100p top-0 left-0 d-f jc-center">
                                        <div className={`${styles.backgrounds} p-rel f-row-betw h-100p`}>
                                            <img className={"h-100p"} src={getImgPath("pelmeni.png")} alt="" />
                                            <img className={"h-100p"} src={getImgPath("vilki.png")} alt="" />
                                        </div>
                                    </div>

                                    <div onClick={() => dispatch(handleBooking())}
                                        className="w-100p f-c-row p-rel h-100p">
                                        <div className={`${styles.text} f-column`}>
                                            <p>Забронируйте</p>
                                            <p>у нас столик!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.menuCategories} ${gTheme("lt-white-bg", "dk-white-bg")}`}>
                            <div className="wrapper ">

                                <div className="w-100p p-rel">
                                    {
                                        sliderNeeded && currentSlide > 0 ? <div style={{ transform: "rotateZ(180deg)" }}
                                            className={`${styles.shadowRight} ${styles.shadowRightDark} ${gTheme("lt-categoriesArrow", "dk-categoriesArrow")} d-f jc-end al-center h-100p p-abs left-0`}>
                                            <div onClick={handlePrev} className={`${gTheme("lt-miniSliderArrow", "dk-miniSliderArrow")} cur-pointer f-c-col`}>
                                                <ArrowMiniRightIcon stroke={"black"} width={14} height={14} />
                                            </div>

                                        </div> : null

                                    }
                                    {
                                        !categories.isLoading && categories.category.length > 0 && sliderNeeded && !isEndSlider ? <div
                                            className={`${styles.shadowRight} ${styles.shadowhtDark} ${gTheme("lt-categoriesArrow", "dk-categoriesArrow")}  d-f jc-end al-center h-100p p-abs right-0`}>
                                            <div onClick={handleNext} className={`${gTheme("lt-miniSliderArrow", "dk-miniSliderArrow")} cur-pointer f-c-col`}>
                                                <ArrowMiniRightIcon  stroke={"black"} width={14} height={14} />
                                            </div>

                                        </div> : null
                                    }


                                    <div className="w-100p d-f gap-10 of-y-hide scrollbar-unset">
                                        {
                                            !categories.isLoading && categories.category.length > 0 ?
                                                <Swiper
                                                    onActiveIndexChange={(slider: SwiperProps) => {
                                                        setIsEndSlider(slider.isEnd)
                                                        setCurrentSlide(slider.activeIndex)
                                                    }}

                                                    style={{ margin: 0 }}
                                                    slidesPerView={'auto'}
                                                    centeredSlides={false}
                                                    className={""}
                                                    ref={sliderCategories}
                                                    spaceBetween={10}
                                                >
                                                    {
                                                        categories.category.map(item => (
                                                            <SwiperSlide key={item.id}
                                                                className={"w-content cur-grabbing"}>
                                                                <ScrollLink spy={true} activeClass={gTheme("lt-categoryActive", "dk-categoryActive")} to={`ctg-${item.id}`} smooth={true} offset={-160}>
                                                                    <GrayBorderedBlock
                                    
                                                                        className={`${styles.item} ${gTheme("lt-categoryItem", "dk-categoryItem")}`}>
                                                                        {item.title}
                                                                    </GrayBorderedBlock>
                                                                </ScrollLink>

                                                            </SwiperSlide>
                                                        ))
                                                    }
                                                </Swiper> :
                                                categories.isLoading ?
                                                    <div className="f-c-col infiniteSpin w-content h-content">
                                                        <Preloader height={20} width={20} />
                                                    </div> :
                                                    <div style={{ fontSize: 16 }} className={gTheme("lt-lg-c", " grayColor_dark")}>
                                                        Категории отсутствуют.
                                                    </div>

                                        }
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={`wrapper ${styles.comboCatalogWrapper} f-column gap-30 w-100p`}>
                            {
                                products.combos.length > 0 ? <div className={`${styles.oftenOrdered} f-column gap-10`}>
                                    <h3 className={"grayColor_dark"}>Комбо</h3>
                                    <Swiper
                                        spaceBetween={19}
                                        slidesPerView={"auto"}
                                        breakpoints={{
                                            640: {
                                                spaceBetween: 29
                                            },
                                            1360: {
                                                spaceBetween: 19
                                            },

                                        }}
                                        className={"f-row-betw w-100p"}>
                                        {
                                            products.combos.map(item => (
                                                <SwiperSlide className={"w-content pd-10-0"}>
                                                    <Combo {...item} />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div> : null
                            }

                            <div className={styles.catalog}>
                                {
                                    deferredSearch.length > 0 ?
                                        <div className={styles.searchedQuery}>Поиск по запросу: {deferredSearch}</div>
                                        : null
                                }
                                <Catalog search={deferredSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modals.bookingOpened ? <BookingWindow /> : null}
        </>

    );
};

export default Main;