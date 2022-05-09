import Layout from "../../../components/Layout";
import { Answer } from "../../../models/Answer";
import { Question } from "../../../models/Question";

type Props = {
  answer: Answer;
  question: Question;
};

export async function getServerSideProps({ query }) {
  const res = await fetch(process.env.API_URL + `/api/answers/${query.id}`);
  const json = await res.json();
  return { props: json };
}

export default function AnswersShow(props: Props) {
  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <>
            <div className="card">
              <div className="card-body">{props.question.body}</div>
            </div>

            <section className="text-center mt-4">
              <h2 className="h4">回答</h2>

              <div className="card">
                <div className="card-body text-left">{props.answer.body}</div>
              </div>
            </section>
          </>
        </div>
      </div>
    </Layout>
  );
}
