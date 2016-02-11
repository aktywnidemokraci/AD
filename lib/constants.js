// enumy
KWESTIA_STATUS = {
    DELIBEROWANA: "deliberowana",
    ARCHIWALNA: "archiwalna",
    ADMINISTROWANA : "administrowana",
    GLOSOWANA: "głosowana",
    REALIZOWANA: "realizowana",
    KOSZ: "kosz",
    OSOBOWA: "osobowa",
    HIBERNOWANA: "hibernowana",
    STATUSOWA: "statusowa",//o nadanie statusu doradcy na honorowego
    OCZEKUJACA:"oczekująca",//oczekuje na akceptacje zaproszenia na honorowego
    ZREALIZOWANA: "zrealizowana"
};

KWESTIA_TYPE={
  "ACCESS_HONOROWY":"czlonkowstwo honorowe",
  "ACCESS_ZWYCZAJNY":"czlonkowstwo zwyczajne",
  "ACCESS_DORADCA":"czlonkowstwo doradcze",
  "GLOBAL_PARAMETERS_CHANGE": "zmiana parametrów",
   "BASIC":"podstawowa"
};

KWESTIA_ACTION={
  "INVITATION_HONOROWY_REJECTED":"Zaproszony odrzucił chęć aplikowania na stanowisko Członka Honorowego",
  "INVITATION_WAITING_TIME_EXPIRED":"Czas oczekiwania na odpowiedź ze strony zaproszonego minął",
  "DELIBERATION_EXPIRED":"Czas deliberacji kwestii minął",
  "NEGATIVE_PRIORITY":"Siła priorytetu w realizacjii była mniejsza od priorytetu w deliberacji (i) głosowaniu *(-1)",
  "NEGATIVE_PRIORITY_VOTE":"Siła priorytetu w głosowaniu była mniejsza od 1",
  "SPECIAL_COMMENT_BIN" :"Wartość priorytetu i kworum w komentarzu specjalnym o tym zdecydowały"
};

SENDING_EMAIL_PROBLEMS={
  "NO_ACTVATION_LINK": "Użytkownik nie mógł aktywować konta, ponieważ z powodu błędu serwera pocztowego nie otrzymał linka aktywacyjnego" ,
  "NO_INVITATION_HONOROWY":  "Użytkownik nie mógł odpowiedzieć na zaproszenie, ponieważ ponieważ z powodu błędu serwera pocztowego nie otrzymał wiaodmości email z linkiem potwierdzającym chęć przynależenia do organizacji"
};

DISCUSSION_OPTIONS = {
    POST_CHARACTERS_DISPLAY: 300,
    POST_ANSWER_CHARACTERS_DISPLAY: 200
};

KWORUM_TYPES = {
    ZWYKLA: "zwykla",
    STATUTOWA: "statutowa"
};

POSTS_TYPES = {
    //domyślna wartość -> komentarz zwykły
    DEFAULT: "default",
    //komentarz, który oznacza chęć przeniesienia kwestii do archiwum
    ARCHIWUM: "archiwum",
    //komentarz, który oznacza chęć przeniesienia do kosza
    KOSZ: "kosz",
    //komentarz, który oznacza chęć przeniesienia kwestii z archiwum do deliberacji
    DELIBERACJA: "deliberacja",
    //komentarz, który oznacza chęć przeniesienia kwesti z realizacji na zrealizowane
    ZREALIZOWANA: "zrealizowana",
    RAPORT: "raport"
};

LANGUAGES = {
    DEFAULT_LANGUAGE: "pl"
}

USERTYPE = {
    ADMIN: "admin",
    CZLONEK : "członek",
    DORADCA : "doradca",
    WSPARCIE: "wsparcie",
    HONOROWY: "honorowy",
    ZWIESZONY:"zawieszony",
    USUNIETY:"usunięty",
    GOSC: "gość"
};

NOTIFICATION_TYPE = {
    HONOROWY_INVITATION: "Zaproszenie do Aplikowania na stanowisko Członka Honorowego",
    NEW_ISSUE: "Pojawienie się nowej Kwestii",
    ISSUE_NO_PRIORITY:"Brak aktywności w Kwestii",
    ISSUE_NO_PRIORITY_REALIZATION:"Brak aktywności w Kwestii w Realizacjii",
    MESSAGE_FROM_USER:"Wiadomość od użytkownika",
    LOOBBING_MESSAGE:"Lobbowanie Kwestii",
    APPLICATION_CONFIRMATION: "Przyjęcie wniosku aplikacyjnego",
    APPLICATION_ACCEPTED: "Pozytywne rozpatrzenie wniosku aplikacyjnego",
    APPLICATION_REJECTED: "Odrzucenie wniosku aplikacyjnego",
    VOTE_BEGINNING:"Rozpoczęcie głosowania Kwestii",
    LACK_OF_REALIZATION_REPORT: "Komunikat o braku Raportu Realizacyjnego",
    FIRST_LOGIN_DATA: "Wysłanie danych do logowania do nowo utworzonego konta",
    RESET_PASSWORD: "Wysłanie linku do resetowania hasła"
};

RADKING = {
    DODANIE_KWESTII: 10,
    WYCOFANIE_KWESTII_DO_ARCHIWUM: -20,
    WYCOFANIE_KWESTII_DO_KOSZA: -40,
    DODANIE_KOMENTARZA: 5,
    DODANIE_ODNIESIENIA: 2,
    WYJSCIE_Z_ZESPOLU_REALIZACYJNEGO: -30,
    NADANIE_PRIORYTETU: 1,
    AWANS_KWESTII_DO_REALIZACJI: 20,
    UDZIAL_W_ZESPOLE_REALIZACYJNYM: 10,
    ZLOZENIE_RAPORTU_REALIZACYJNEGO: 5
};
