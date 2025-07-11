// costCenterRules.js
export const COST_CENTER_RULES = [
  // TA
  { position: "TA", location: "TEMPE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG02202" },
  { position: "TA", location: "TEMPE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG06875" },
  { position: "TA", location: "POLY", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG02202" },
  { position: "TA", location: "POLY", campus: "POLY", acadCareer: "GRAD", costCenterKey: "CC0136/PG06875" },
  { position: "TA", location: "ICOURSE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG01943" },
  { position: "TA", location: "ICOURSE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG06316" },
  { position: "TA", location: "ICOURSE", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG02003" },

  // IOR
  { position: "IOR", location: "TEMPE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG02202" },
  { position: "IOR", location: "TEMPE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG06875" },
  { position: "IOR", location: "POLY", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG02202" },
  { position: "IOR", location: "POLY", campus: "POLY", acadCareer: "GRAD", costCenterKey: "CC0136/PG06875" },
  { position: "IOR", location: "ICOURSE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG01943" },
  { position: "IOR", location: "ICOURSE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG06316" },
  { position: "IOR", location: "ICOURSE", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG02003" },

  // Grader
  { position: "Grader", location: "TEMPE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG14700" },
  { position: "Grader", location: "TEMPE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG14700" },
  { position: "Grader", location: "POLY", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG14700" },
  { position: "Grader", location: "POLY", campus: "POLY", acadCareer: "GRAD", costCenterKey: "CC0136/PG14700" },
  { position: "Grader", location: "ICOURSE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG01943" },
  { position: "Grader", location: "ICOURSE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG06316" },
  { position: "Grader", location: "ICOURSE", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG02003" },

  // IA
  { position: "IA", location: "TEMPE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG15818" },
  { position: "IA", location: "TEMPE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG15818" },
  { position: "IA", location: "POLY", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG15818" },
  { position: "IA", location: "POLY", campus: "POLY", acadCareer: "GRAD", costCenterKey: "CC0136/PG15818" },
  { position: "IA", location: "ICOURSE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG01943" },
  { position: "IA", location: "ICOURSE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG01943" },
  { position: "IA", location: "ICOURSE", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG02003" },
  { position: "IA", location: "ICOURSE", campus: "POLY", acadCareer: "GRAD", costCenterKey: "CC0136/PG02003" },

  // TA (GSA) 1 credit
  { position: "TA (GSA) 1 credit", location: "TEMPE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG02202" },
  { position: "TA (GSA) 1 credit", location: "TEMPE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG06875" },
  { position: "TA (GSA) 1 credit", location: "POLY", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG02202" },
  { position: "TA (GSA) 1 credit", location: "POLY", campus: "POLY", acadCareer: "GRAD", costCenterKey: "CC0136/PG06875" },
  { position: "TA (GSA) 1 credit", location: "ICOURSE", campus: "TEMPE", acadCareer: "UGRD", costCenterKey: "CC0136/PG01943" },
  { position: "TA (GSA) 1 credit", location: "ICOURSE", campus: "TEMPE", acadCareer: "GRAD", costCenterKey: "CC0136/PG06316" },
  { position: "TA (GSA) 1 credit", location: "ICOURSE", campus: "POLY", acadCareer: "UGRD", costCenterKey: "CC0136/PG02003" }
];

// Util function
export function computeCostCenterKey(position, location, campus, acadCareer) {
  const rule = COST_CENTER_RULES.find(rule =>
    rule.position === position &&
    rule.location === location &&
    rule.campus === campus &&
    rule.acadCareer === acadCareer
  );
  return rule ? rule.costCenterKey : "UNKNOWN";
}