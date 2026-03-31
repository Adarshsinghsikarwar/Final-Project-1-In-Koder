import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import CandidateHome from "./pages/Dashboard/CandidateHome";
import InterviewSetup from "./pages/InterviewSetup/InterviewSetup";
import AIInterviewRoom from "./pages/AIInterviewRoom/AIInterviewRoom";
import LiveInterviewRoom from "./pages/LiveInterviewRoom/LiveInterviewRoom";
import Reports from "./pages/Reports/Reports";
import Admin from "./pages/Admin/Admin";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import { ROLES } from "./utils/auth";

function App() {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* Public */}
      <Route element={<PublicRoutes />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Staff Only Dashboard */}
      <Route element={<ProtectedRoutes allowedRoles={[ROLES.INTERVIEWER, ROLES.ADMIN]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Candidate Home */}
      <Route element={<ProtectedRoutes allowedRoles={[ROLES.CANDIDATE]} />}>
        <Route path="/candidate/home" element={<CandidateHome />} />
      </Route>

      {/* Shared Protected */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/reports" element={<Reports />} />
      </Route>

      {/* Candidate Only */}
      <Route element={<ProtectedRoutes allowedRoles={[ROLES.CANDIDATE]} />}>
        <Route path="/interview/setup" element={<InterviewSetup />} />
        <Route path="/interview/ai-room" element={<AIInterviewRoom />} />
      </Route>

      {/* Interviewer Only */}
      <Route element={<ProtectedRoutes allowedRoles={[ROLES.INTERVIEWER]} />}>
        <Route path="/interview/live-room" element={<LiveInterviewRoom />} />
      </Route>

      {/* HR / Admin Only */}
      <Route element={<ProtectedRoutes allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
