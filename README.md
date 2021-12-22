# instagram documentation

# (--- ---) - ichidigila o'zgardi filela firebasega joylab linkini jo'natiladi

URL = "https://thismyinstagram.herokuapp.com"

(--- image and video src = "url/media" + img or video -- src atributiga img bo'sa img tagiga video bo'sa video tagiga qo'yish kerak ---)

# token shart bo'lmaganlari

# POST

1. url/auth/register
   body = { firstName, lastName, email, password }
2. url/auth/login
   body = { email, password }

# token shart bo'lganlari

headers = { token }

# GET

1. url/api/home -- "users, posts, comments"
2. url/api/profile -- "user, user_posts, comments"

# POST

1. url/api/profile/post
   body = { media, name } -- (--- formdata da jo'natish kerak ---) - firebasega joylab media dan link jo'natish kerak
2. url/api/comment
   body = { comment, postId } -- postga comment yozish
3. url/api/comment/{commentId}
   body = { comment, postId } -- commentga comment yozish

# PUT

1. url/api/profile
   body = { firstName, lastName, image } -- holaganini o'zgartirsa bo'ladi, agar image jo'natilsa (--- formdatadan ---) firebasega imageni joylab image dan link jo'natish kerak

2. url/api/profile/post
   body = { name, postId }
3. url/api/profile/password
   body = { email, oldPassword, newPassword, newPasswordTwo } -- password yengilash

# DELETE

1. url/api/profile/post/{postId} -- post deleted
2. url/api/comment/{commentId} -- comment deleted
3. url/api/profile -- profil deleted, exit
