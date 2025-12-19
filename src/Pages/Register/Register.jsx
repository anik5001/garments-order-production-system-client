import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateProfileUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();

  const registerHandler = (data) => {
    // console.log(data);
    // console.log(data.email);
    setRegisterLoading(true);
    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        // profile update

        const formData = new FormData();
        formData.append("image", profileImg);
        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_key
        }`;

        axios
          .post(image_Api_Url, formData)
          .then((res) => {
            // console.log("after image upload", res.data.data.url);

            //  userInfo
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL: res.data.data.url,
              userRole: data.role,
            };

            axiosSecure.post("/user", userInfo).then((res) => {
              if (res.data.insertedId) {
                // console.log("user added data DB");
              }
            });

            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };

            updateProfileUser(userProfile)
              .then(() => {
                toast.success("Register Successful ");
                navigate(location?.state || "/");
                setRegisterLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((er) => {
            console.log(er);
          });
      })
      .catch((e) => {
        toast.error(e.message);
        setRegisterLoading(false);
      });
  };
  return (
    <div>
      <div className="card bg-base-100  max-w-sm mx-auto shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-4xl font-bold">Create an Account</h1>
          <p className="mb-3 text-gray-600">
            Register with Garments Order and Tracking System
          </p>
          <form onSubmit={handleSubmit(registerHandler)}>
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name must be required</p>
              )}
              {/* Photo */}
              <label className="label">Image</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="Your Photo"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Name must be required</p>
              )}

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email must be required</p>
              )}
              <label className="label"> Role</label>
              <select
                defaultValue="Pick a role"
                className="select"
                {...register("role")}
              >
                <option disabled={true}>Pick a role</option>
                <option value="Manager">Manager</option>
                <option value="Buyer">Buyer</option>
                {/* <option value="">Velvet</option> */}
              </select>
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password must be required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password at least 6 character or longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must contain uppercase, lowercase, number, special
                  character, and be 8+ characters
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary text-white mt-4">
                {registerLoading ? "Register..." : "   Register"}
              </button>
            </fieldset>
          </form>
          <p>
            Already have an account?{" "}
            <Link
              state={location?.state}
              className="text-blue-500 hover:underline cursor-pointer"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
