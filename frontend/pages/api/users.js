import nc from 'next-connect';
import { sessionMiddleware } from '../../middlewares/session';
import { createStrapiAxios } from '../../utils/strapi';

export default nc()
.use(sessionMiddleware)
  .post(async (req, res) => {
    const { id, username, email, address} = req.body;
    const userSession = req.session.get('user');
    try {
      const user = await createStrapiAxios(userSession)
        .put(`/users/${id}`, {username, email, address})
        .then((res) => res.data)
        .then((data) => ({
          // ...data,
          id : data.id,
          username : data.username,
          email : data.email,
          address : data.address,
          confirmed : data.username,
          profileImage : data.username,
          strapiToken: req.session.get('user').strapiToken,
        })).catch(error => console.error(`Axios PUT /users/${id} - `, error))

      req.session.set('user', user);
      await req.session.save();
      res.json(user);
    } catch (error) {
      console.log(error)
    }
  });

  