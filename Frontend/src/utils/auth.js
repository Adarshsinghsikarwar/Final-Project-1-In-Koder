export const ROLES = {
  CANDIDATE: "Candidate",
  INTERVIEWER: "Interviewer",
  ADMIN: "Admin",
};

// Central mock user - Change this to test different roles!
export const mockUser = {
  isAuthenticated: true,
  role: ROLES.INTERVIEWER, 
};
