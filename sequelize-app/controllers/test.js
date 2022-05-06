router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await Users.findOne({ where: { username: username } }) 

	if (!user) { 
		res.json({ error: "L'utilisateur n'existe pas !" })
	} else {
		// On vérifie si les données sont exactes
		bcrypt.compare(password, user.password).then(async (match) => { 
			if (!match) { 
				// On renvoie l'erreur
				res.json({ error: 'Mauvaise combination' }) 
			} else {
				// On crée un token
				const accessToken = sign(
					{ username: user.username, id: user.id }, 
					"importantsecret" 
				)
				
				res.json({ token: accessToken, username: username, id: user.id, isAdmin: user.isAdmin })
			}
		})
	}
})
