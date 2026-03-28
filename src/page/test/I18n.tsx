import { useI18n } from "@/context/I18nContext";

export default function I18n() {

  const { t, locale, setLocale } = useI18n()

  async function changeLocale() {
    if(locale == 'ko') await setLocale('en')
    else await setLocale('ko')
  }

  return (
    <>
      <p>현재 언어: { locale }</p>
      <p>{ t('test.message') }</p>
      <button type="button" onClick={ changeLocale }>언어변환</button>
    </>
  )

}