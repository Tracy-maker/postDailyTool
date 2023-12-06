import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="flex">
          <section className="flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <section className="flex-1">
            <video
              autoPlay
              loop
              muted
              controls={false}
              width="100%"
              height="auto"
            >
              <source
                src="https://player.vimeo.com/external/494507539.sd.mp4?s=a93c5e5a39e2f73481762e67fb3897b5080dc6a8&profile_id=165&oauth2_token_id=57447761"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </section>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
