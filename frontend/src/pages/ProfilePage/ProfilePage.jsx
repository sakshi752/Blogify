import React from 'react'
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { user, token } = useSelector(
    (state) => state.auth
  );
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>

        <div>

        </div>

        <div className='lg:col-span-4'>
          <div className='sticky top-2/4 bg-blue-400/20 backdrop-blur-md p-6'>
            <div className='flex items-center justify-center'>
              <img src={user.avatar.url} alt={user.fullname}
                className='w-52 h-52 object-cover rounded-full'
              />
            </div>

            <h1 className="text-2xl font-bold text-center mt-4">
              {user.fullname}
            </h1>

            <p className="text-center text-gray-400">
              @{user.username}
            </p>

            <p className="mt-4 text-center">
              {user.bio}
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">

              <div>
                <h2 className="font-bold">{user.blogsCount}</h2>
                <p>Posts</p>
              </div>

              <div>
                <h2 className="font-bold">{user.followersCount}</h2>
                <p>Followers</p>
              </div>

              <div>
                <h2 className="font-bold">{user.followingCount}</h2>
                <p>Following</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProfilePage
