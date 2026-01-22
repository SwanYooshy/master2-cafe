import { Link, Head } from '@inertiajs/react'

type User = {
  id: number
  name: string
  email: string
}

type Props = {
  users: User[]
}

export default function Index({ users }: Props) {
  return (
    <>
      <Head title="Utilisateurs" />

      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Liste des utilisateurs
        </h1>

        <div style={{ margin: '1rem 0' }}>
          <Link
            href="/users/create"
            className="text-blue-600 underline"
          >
            ➕ Créer un utilisateur
          </Link>
        </div>

        <table width="100%" cellPadding={8}>
          <thead>
            <tr>
              <th align="left">Nom</th>
              <th align="left">Email</th>
              <th align="left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    href={`/users/${user.id}/edit`}
                    className="text-blue-600 underline"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
