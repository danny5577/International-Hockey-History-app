import { Tournament, Team, Game, PlayerStat } from "./types";

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

export const games: Game[] = [
  // --- 2000, Saint Petersburg ---
  { id: "g2000-final", tournamentId: "wc-2000", stage: "final", date: "2000-05-14", homeTeamId: "cze", awayTeamId: "svk", homeScore: 5, awayScore: 3 },
  { id: "g2000-bronze", tournamentId: "wc-2000", stage: "bronze", date: "2000-05-13", homeTeamId: "fin", awayTeamId: "can", homeScore: 2, awayScore: 1 },

  // --- 2001, Hanover ---
  { id: "g2001-final", tournamentId: "wc-2001", stage: "final", date: "2001-05-13", homeTeamId: "cze", awayTeamId: "fin", homeScore: 3, awayScore: 2, overtime: true },

  // --- 2002, Sweden ---

  { id: "g2002-groupA1", tournamentId: "wc-2002", stage: "group", groupName: "A", date: "2002-04-26", homeTeamId: "ger", awayTeamId: "jpn", homeScore: 9, awayScore: 2 },
  { id: "g2002-groupA2", tournamentId: "wc-2002", stage: "group", groupName: "A", date: "2002-04-26", homeTeamId: "sui", awayTeamId: "cze", homeScore: 0, awayScore: 5 },
  { id: "g2002-groupA3", tournamentId: "wc-2002", stage: "group", groupName: "A", date: "2002-04-28", homeTeamId: "ger", awayTeamId: "sui", homeScore: 3, awayScore: 0 },
  { id: "g2002-groupA4", tournamentId: "wc-2002", stage: "group", groupName: "A", date: "2002-04-28", homeTeamId: "cze", awayTeamId: "jpn", homeScore: 5, awayScore: 3 },
  { id: "g2002-groupA5", tournamentId: "wc-2002", stage: "group", groupName: "A", date: "2002-04-29", homeTeamId: "jpn", awayTeamId: "sui", homeScore: 1, awayScore: 5 },
  { id: "g2002-groupA6", tournamentId: "wc-2002", stage: "group", groupName: "A", date: "2002-04-29", homeTeamId: "cze", awayTeamId: "ger", homeScore: 7, awayScore: 5 },

  { id: "g2002-groupB1", tournamentId: "wc-2002", stage: "group", groupName: "B", date: "2002-04-27", homeTeamId: "svk", awayTeamId: "pol", homeScore: 7, awayScore: 0 },
  { id: "g2002-groupB2", tournamentId: "wc-2002", stage: "group", groupName: "B", date: "2002-04-27", homeTeamId: "ukr", awayTeamId: "fin", homeScore: 0, awayScore: 3 },
  { id: "g2002-groupB3", tournamentId: "wc-2002", stage: "group", groupName: "B", date: "2002-04-29", homeTeamId: "svk", awayTeamId: "ukr", homeScore: 5, awayScore: 3 },
  { id: "g2002-groupB4", tournamentId: "wc-2002", stage: "group", groupName: "B", date: "2002-04-29", homeTeamId: "fin", awayTeamId: "pol", homeScore: 8, awayScore: 0 },
  { id: "g2002-groupB5", tournamentId: "wc-2002", stage: "group", groupName: "B", date: "2002-04-30", homeTeamId: "fin", awayTeamId: "svk", homeScore: 3, awayScore: 1 },
  { id: "g2002-groupB6", tournamentId: "wc-2002", stage: "group", groupName: "B", date: "2002-04-30", homeTeamId: "pol", awayTeamId: "ukr", homeScore: 0, awayScore: 3 },

  { id: "g2002-groupC1", tournamentId: "wc-2002", stage: "group", groupName: "C", date: "2002-04-26", homeTeamId: "rus", awayTeamId: "svn", homeScore: 8, awayScore: 1 },
  { id: "g2002-groupC2", tournamentId: "wc-2002", stage: "group", groupName: "C", date: "2002-04-26", homeTeamId: "aut", awayTeamId: "swe", homeScore: 3, awayScore: 5 },
  { id: "g2002-groupC3", tournamentId: "wc-2002", stage: "group", groupName: "C", date: "2002-04-28", homeTeamId: "rus", awayTeamId: "aut", homeScore: 6, awayScore: 3 },
  { id: "g2002-groupC4", tournamentId: "wc-2002", stage: "group", groupName: "C", date: "2002-04-28", homeTeamId: "swe", awayTeamId: "svn", homeScore: 8, awayScore: 2 },
  { id: "g2002-groupC5", tournamentId: "wc-2002", stage: "group", groupName: "C", date: "2002-04-30", homeTeamId: "svn", awayTeamId: "aut", homeScore: 3, awayScore: 5 },
  { id: "g2002-groupC6", tournamentId: "wc-2002", stage: "group", groupName: "C", date: "2002-04-30", homeTeamId: "swe", awayTeamId: "rus", homeScore: 2, awayScore: 0 },

  { id: "g2002-groupD1", tournamentId: "wc-2002", stage: "group", groupName: "D", date: "2002-04-27", homeTeamId: "ita", awayTeamId: "usa", homeScore: 2, awayScore: 5 },
  { id: "g2002-groupD2", tournamentId: "wc-2002", stage: "group", groupName: "D", date: "2002-04-27", homeTeamId: "can", awayTeamId: "lva", homeScore: 4, awayScore: 1 },
  { id: "g2002-groupD3", tournamentId: "wc-2002", stage: "group", groupName: "D", date: "2002-04-29", homeTeamId: "can", awayTeamId: "ita", homeScore: 5, awayScore: 0 },
  { id: "g2002-groupd4", tournamentId: "wc-2002", stage: "group", groupName: "D", date: "2002-04-29", homeTeamId: "usa", awayTeamId: "lva", homeScore: 3, awayScore: 2 },
  { id: "g2002-groupD5", tournamentId: "wc-2002", stage: "group", groupName: "D", date: "2002-04-30", homeTeamId: "lva", awayTeamId: "ita", homeScore: 4, awayScore: 1 },
  { id: "g2002-groupD6", tournamentId: "wc-2002", stage: "group", groupName: "D", date: "2002-04-30", homeTeamId: "usa", awayTeamId: "can", homeScore: 1, awayScore: 2 },





  { id: "g2002-final", tournamentId: "wc-2002", stage: "final", date: "2002-05-12", homeTeamId: "svk", awayTeamId: "rus", homeScore: 4, awayScore: 3 },

  // --- 2003, Helsinki ---
  { id: "g2003-final", tournamentId: "wc-2003", stage: "final", date: "2003-05-11", homeTeamId: "can", awayTeamId: "swe", homeScore: 3, awayScore: 2, overtime: true },

  // --- 2004, Prague ---
  { id: "g2004-final", tournamentId: "wc-2004", stage: "final", date: "2004-05-09", homeTeamId: "can", awayTeamId: "swe", homeScore: 5, awayScore: 3 },
  { id: "g2004-bronze", tournamentId: "wc-2004", stage: "bronze", date: "2004-05-09", homeTeamId: "usa", awayTeamId: "svk", homeScore: 1, awayScore: 0, overtime: true },

  // --- 2007, Russia ---
  { id: "g2007-groupA1", tournamentId: "wc-2007", stage: "group", groupName: "A", date: "2007-04-28", homeTeamId: "sui", awayTeamId: "lva", homeScore: 2, awayScore: 1 },
  { id: "g2007-groupA2", tournamentId: "wc-2007", stage: "group", groupName: "A", date: "2007-04-28", homeTeamId: "swe", awayTeamId: "ita", homeScore: 7, awayScore: 1 },
  { id: "g2007-groupA3", tournamentId: "wc-2007", stage: "group", groupName: "A", date: "2007-04-30", homeTeamId: "sui", awayTeamId: "ita", homeScore: 2, awayScore: 1 },
  { id: "g2007-groupA4", tournamentId: "wc-2007", stage: "group", groupName: "A", date: "2007-04-30", homeTeamId: "lva", awayTeamId: "swe", homeScore: 2, awayScore: 8 },
  { id: "g2007-groupA5", tournamentId: "wc-2007", stage: "group", groupName: "A", date: "2007-05-02", homeTeamId: "ita", awayTeamId: "lva", homeScore: 4, awayScore: 3, overtime: true },
  { id: "g2007-groupA6", tournamentId: "wc-2007", stage: "group", groupName: "A", date: "2007-05-02", homeTeamId: "swe", awayTeamId: "sui", homeScore: 6, awayScore: 0 },


  // ---2002, Salt Lake City ---
  { id: "og2002-final", tournamentId: "og-2002", stage: "final", date: "2004-02-24", homeTeamId: "usa", awayTeamId: "can", homeScore: 2, awayScore: 5 },

];

export const playerStats: PlayerStat[] = []; // intentionally empty — added later