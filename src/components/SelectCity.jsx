import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"

function SelectCity({ selectedCity, setSelectedCity }) {

    const availableCities = [
        { city: "Menoufia", shownName: "المنوفية" },
        { city: "Alexandria", shownName: "الاسكندرية" },
        { city: "Sharm El-sheikh", shownName: "شرم الشيخ" },
        { city: "Cairo", shownName: "القاهرة" },
        { city: "Giza", shownName: "الجيزة" },
        { city: "Aswan", shownName: "أسوان" },
        { city: "Luxor", shownName: "الأقصر" },
        { city: "Suez", shownName: "السويس" },
        { city: "Ismailia", shownName: "الإسماعيلية" },
        { city: "Tanta", shownName: "طنطا" },
        { city: "Mansoura", shownName: "المنصورة" },
        { city: "Zagazig", shownName: "الزقازيق" },
        { city: "Port Said", shownName: "بورسعيد" },
        { city: "Damanhur", shownName: "دمنهور" },
        { city: "Faiyum", shownName: "الفيوم" },

    ];

    const oncityChange = (event) => {
        const chosenCity = availableCities.find(
            (c) => c.city === event.target.value
        );
        setSelectedCity(chosenCity);
    };

    return (
        <div className="flex items-center justify-center w-full my-20">
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel
                    sx={{ color: "wheat", "&.Mui-focused ": { color: "wheat" } }}

                >
                    City
                </InputLabel>

                <Select
                    value={selectedCity.city}
                    label="city"
                    onChange={oncityChange}
                    className=""
                    sx={{
                        color: "wheat",
                        fontSize: "20px",
                        ".MuiOutlinedInput-notchedOutline": { borderColor: "wheat" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "wheat" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "wheat" },
                        ".MuiSvgIcon-root": { color: "wheat" }
                    }}
                >
                    {availableCities.map((city) => (
                        <MenuItem
                            key={city.city}
                            value={city.city}
                            sx={{
                                color: "#00302e",
                                fontSize: "20px",
                                "&.Mui-selected": { backgroundColor: "wheat" },
                                "&.Mui-selected:hover": { backgroundColor: "wheat" },
                            }}
                        >
                            {city.shownName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SelectCity;
