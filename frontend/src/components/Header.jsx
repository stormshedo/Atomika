import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Listbox } from "@headlessui/react";

const Header = () => {
    const { t, i18n } = useTranslation();
    const langs = [
        {
            id: 0,
            lang: "ru",
            name: "Русский"
        },
        {
            id: 1,
            lang: "uz",
            name: "O'zbek"
        }
    ]

    const handleChangeLanguage = (e) => {
        i18n.changeLanguage(e);
    };

        return(
            <header className="flex justify-between items-center mt-7.5 mb-16 px-10 max-md:flex-col gap-4 max-md:justify-center">
                <div className='max-w-[219px] w-full flex max-md:justify-center max-md:order-2'>
                    <div className="relative inline-block">
                        {/* <select className="appearance-none pr-14 pl-10 py-5 rounded-full bg-white text-button focus:outline-none" value={i18n.language} onChange={handleChangeLanguage}>
                            <option className="" value="ru">Русский</option>
                            <option value="uz">O'zbek</option>
                        </select> */}
                        <Listbox value={i18n.language} onChange={(value) => {handleChangeLanguage(value)}}> 
                            <Listbox.Button className="bg-white rounded-full py-5 px-10 text-left flex justify-center items-center gap-2 outline-none text-button">
                            {i18n.language == "ru" ? "Русский" : "O'zbek"}
                            <ChevronDownIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                            </Listbox.Button>
                            <div className="relative">
                            <Listbox.Options className="bg-white rounded-2xl mt-1 outline-none w-full absolute z-10 shadow-md">
                            {langs.map((option) => (
                                <Listbox.Option
                                key={option.id}
                                value={option.lang}
                                className="py-3 hover:bg-blue-100 first:hover:rounded-t-2xl last:hover:rounded-b-2xl cursor-pointer px-5"
                                >
                                {option.name}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                            </div>
                        </Listbox>
                        {/* <div className="pointer-events-none absolute inset-y-0 right-[15%] flex items-center pr-2 text-button">
                            ▼
                        </div> */}
                    </div>
                </div>
                <div className="min-w-[264px] bg-white rounded-full mx-auto">
                    <p className="text-atomika font-semibold text-4xl pt-2 pb-3 font-gilroy text-center">atomika</p>
                </div>
                <div className="w-full max-w-[219px] flex justify-end max-md:justify-center"><Link to="/" className='bg-white text-button py-5 px-10 rounded-full'>{t('home')}</Link></div>
            </header>
        )
}

export default Header;