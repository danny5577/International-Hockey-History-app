import { Tournament, Team, PlayerStat } from "./types";

export const tournaments: Tournament[] = [
  { id: "wc-2000", type: "WC", year: 2000, host: "Russia", startDate: "2000-04-29", endDate: "2000-05-14" },
  { id: "wc-2001", type: "WC", year: 2001, host: "Germany", startDate: "2001-04-28", endDate: "2001-05-13" },
  { id: "wc-2002", type: "WC", year: 2002, host: "Sweden", startDate: "2002-04-27", endDate: "2002-05-12" },
  { id: "wc-2003", type: "WC", year: 2003, host: "Finland", startDate: "2003-04-26", endDate: "2003-05-11" },
  { id: "wc-2004", type: "WC", year: 2004, host: "Czech Republic", startDate: "2004-04-24", endDate: "2004-05-09" },
  { id: "wc-2007", type: "WC", year: 2007, host: "Russia", startDate: "2007-04-27", endDate: "2007-05-13" },

  {
    id: "og-2002",
    type: "OG",
    year: 2002,
    host: "United States",
    startDate: "2000-02-09",
    endDate: "2000-02-24",
  },
];

export const teams: Team[] = [
  { id: "svk", name: "Slovakia", code: "SVK", isoCode: "sk" },
  { id: "rus", name: "Russia", code: "RUS", isoCode: "ru" },
  { id: "swe", name: "Sweden", code: "SWE", isoCode: "se" },
  { id: "cze", name: "Czech Republic", code: "CZE", isoCode: "cz" },
  { id: "fin", name: "Finland", code: "FIN", isoCode: "fi" },
  { id: "can", name: "Canada", code: "CAN", isoCode: "ca" },
  { id: "usa", name: "United States", code: "USA", isoCode: "us" },
  { id: "ger", name: "Germany", code: "GER", isoCode: "de" },
  { id: "sui", name: "Switzerland", code: "SUI", isoCode: "ch" },
  { id: "jpn", name: "Japan", code: "JPN", isoCode: "jp" },
  { id: "ukr", name: "Ukraine", code: "UKR", isoCode: "ua" },
  { id: "pol", name: "Poland", code: "POL", isoCode: "pl" },
  { id: "aut", name: "Austria", code: "AUT", isoCode: "at" },
  { id: "svn", name: "Slovenia", code: "SVN", isoCode: "si" },
  { id: "lva", name: "Latvia", code: "LVA", isoCode: "lv" },
  { id: "ita", name: "Italy", code: "ITA", isoCode: "it" },
  { id: "blr", name: "Belarus", code: "BLR", isoCode: "by" },
  { id: "den", name: "Denmark", code: "DEN", isoCode: "dk" },
  { id: "nor", name: "Norway", code: "NOR", isoCode: "no" },
  { id: "fra", name: "France", code: "FRA", isoCode: "fr" },
  { id: "kaz", name: "Kazakhstan", code: "KAZ", isoCode: "kz" },
  { id: "hun", name: "Hungary", code: "HUN", isoCode: "hu" },
  { id: "gbr", name: "Great Britain", code: "GBR", isoCode: "gb" },
  { id: "kor", name: "South Korea", code: "KOR", isoCode: "kr" },
  { id: "chn", name: "China", code: "CHN", isoCode: "cn" },

];

export const playerStats: PlayerStat[] = []; // for later