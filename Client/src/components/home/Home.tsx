import Loader from "../../commons/loader/Loader";
import { useGetAllCompanies } from "../../hooks/useCompanies";

export default function Home() {
	const { companies, loading, error } = useGetAllCompanies([]);

	return (
		<>
			{loading && !error ? (
				<Loader />
			) : error ? (
				<p>Сървърът не отговаря моля опитайте по късно!</p>
			) : (
				<section>
					<section>
						<h1>
							Добре дошли в Job Seeker. Намерете своята работа
							сега!
						</h1>
						<section>
							<h2>Фирми</h2>
							<section>
								{companies.length === 0 ? (
									<p>Няма регистрирани фирми все още</p>
								) : (
									companies.map((el) => (
										<article key={el._id}>
											<img
												src={el.logo.url}
												alt="Лого на фирма"
											/>
											<p>{el.name}</p>
										</article>
									))
								)}
							</section>
						</section>
					</section>
				</section>
			)}
		</>
	);
}
