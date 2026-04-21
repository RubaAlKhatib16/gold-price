import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire("Success", "Profile updated successfully", "success");
        setIsEditing(false);
        
        window.location.reload();
      } else {
        Swal.fire("Error", data.message || "Update failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-10">
        <div className="bg-surface-container-lowest rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary-container p-6">
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
            <p className="text-white/80">Manage your account settings</p>
          </div>

          <div className="p-6 space-y-6">
            {/* صورة افتراضية */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-primary">
                <span className="material-symbols-outlined text-5xl text-primary">
                  account_circle
                </span>
              </div>
            </div>

            {!isEditing ? (
              
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <p className="text-sm text-on-surface-variant">Full Name</p>
                  <p className="text-lg font-semibold text-on-surface">{user?.name}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-on-surface-variant">Email Address</p>
                  <p className="text-lg font-semibold text-on-surface">{user?.email}</p>
                </div>
                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={logout}
                    className="bg-error/10 text-error px-6 py-2 rounded-full hover:bg-error/20"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
             
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 p-3 border rounded-xl bg-surface-container-low focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 p-3 border rounded-xl bg-surface-container-low focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white px-6 py-2 rounded-full disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-surface-container-high text-on-surface px-6 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;