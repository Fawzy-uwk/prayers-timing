import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import SelectCity from './SelectCity';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import fajrImg from "../assets/fajr.jpg";
import sunrise from "../assets/sunrise.jpg";
import dhur from "../assets/dhur.jpg";
import asr from "../assets/asr.jpg";
import maghrib from "../assets/maghreb.jpg";
import isha from "../assets/isha.jpg";
import moment from "moment-timezone";
import baseMoment from 'moment';



import 'moment/locale/ar-dz';




function MainContainer() {
    const prayersArray = [{ name: "الفجر", key: "Fajr" },

    { name: "الظهر", key: "Dhuhr" },
    { name: "العصر", key: "Asr" },
    { name: "المغرب", key: "Maghrib" },
    { name: "العشاء", key: "Isha" }];
    const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

    const [timings, setTimings] = useState([]);
    const [time, setTime] = useState('');
    const [date, setDate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timezone, setTimezone] = useState("");
    const [selectedCity, setSelectedCity] = useState({ city: 'Menoufia', shownName: 'المنوفية' });
    const [remainingTime, setRemainingTime] = useState("")

    useEffect(() => {



        axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.city}&country=EG`)
            .then(response => {
                setLoading(true);
                setTimings(response.data.data.timings);
                console.log(response.data.data);
                setDate(response.data.data.date);
                setTimezone(response.data.data.meta.timezone);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the prayer timings!', error);
            });

        const fetchTimings = moment();
        setTime(fetchTimings.locale('ar-dz').format('LT'));
        if (timezone) {
            const localTime = moment().tz(timezone).locale('ar-dz').format('LT');
            setTime(localTime);
        }


    }, [selectedCity, timezone]);

    useEffect(() => {
        setLoading(true);
        if (!timings || Object.keys(timings).length === 0) return;

        const timer = setInterval(() => {
            setLoading(true);
            handleCountDownTimer();
            setLoading(false);
        }, 1000);

        return () => clearInterval(timer);


    }, [timings]);


    const handleCountDownTimer = () => {
        const now = baseMoment();

        const fajr = baseMoment(timings.Fajr, "HH:mm");
        const dhuhr = baseMoment(timings.Dhuhr, "HH:mm");
        const asr = baseMoment(timings.Asr, "HH:mm");
        const maghrib = baseMoment(timings.Maghrib, "HH:mm");
        const isha = baseMoment(timings.Isha, "HH:mm");

        let nextPrayer = 0; // default Fajr

        // ✔ قبل الفجر → القادم هو الفجر
        if (now.isBefore(fajr)) {
            nextPrayer = 0;
        }
        // ✔ بين الفجر والظهر
        else if (now.isBefore(dhuhr)) {
            nextPrayer = 1;
        }
        // ✔ بين الظهر والعصر
        else if (now.isBefore(asr)) {
            nextPrayer = 2;
        }
        // ✔ بين العصر والمغرب
        else if (now.isBefore(maghrib)) {
            nextPrayer = 3;
        }
        // ✔ بين المغرب والعشاء
        else if (now.isBefore(isha)) {
            nextPrayer = 4;
        }
        // ✔ بعد العشاء → القادم هو فجر "اليوم التالي"
        else {
            nextPrayer = 0;
            fajr.add(1, "day"); // أهم خطوة لعلاج مشكلة الفجر
        }

        setNextPrayerIndex(nextPrayer);

        // حساب الوقت المتبقي
        const nextPrayerObject = prayersArray[nextPrayer];
        const nextPrayerTime = nextPrayerObject.key === "Fajr" ? fajr : baseMoment(timings[nextPrayerObject.key], "HH:mm");

        const diff = nextPrayerTime.diff(now);
        const duration = moment.duration(diff);

        setRemainingTime(
            `${String(duration.seconds()).padStart(2, "0")} : ${String(duration.minutes()).padStart(2, "0")} : ${String(duration.hours()).padStart(2, "0")}`
        );
    };




    if (loading) {
        return <Loader />
    }
    return (
        <>
            <Grid container  >
                <Grid size={{ xs: 12, md: 6 }} >
                    <div className='my-4 flex flex-col items-start justify-center gap-2'>
                        <span className='text-base font-semibold text-gray-300'> ه  {date.hijri.date} | م {date.gregorian.date} | {time}</span>
                        <h1 className='text-4xl font-bold'>{selectedCity.shownName}</h1>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <div className='my-4 flex flex-col items-start justify-center gap-2'>
                        <span className='text-base font-semibold text-gray-300' >متبقى حتى صلاة {prayersArray[nextPrayerIndex].name} </span>
                        <h3 className='text-4xl font-bold text-right'> {remainingTime}  </h3>

                    </div>
                </Grid>
                <Grid size={12}>
                    <Divider style={{ borderColor: "wheat", opacity: .2 }} />
                </Grid>
            </Grid>

            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: "center", justifyContent: "center" }} className='mt-10 '>
                <Prayer name="الفجر" time={timings.Fajr} src={fajrImg} />
                <Prayer name="الشروق" time={timings.Sunrise} src={sunrise} />
                <Prayer name="الظهر" time={timings.Dhuhr} src={dhur} />
                <Prayer name="العصر" time={timings.Asr} src={asr} />
                <Prayer name="المغرب" time={timings.Maghrib} src={maghrib} />
                <Prayer name="العشاء" time={timings.Isha} src={isha} />
            </Stack>

            <SelectCity selectedCity={selectedCity} setSelectedCity={setSelectedCity} />


        </>
    )
}

export default MainContainer;
