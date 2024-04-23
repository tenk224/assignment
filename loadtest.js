import http from 'k6/http';

export default function () {
  http.get('http://localhost');
}

export function handleSummary(data) {
  let avgResponseTime = data.metrics.http_req_duration.values['avg'];
  let p95ResponseTime = data.metrics.http_req_duration.values['p(95)'];
  let p90ReponnseTime = data.metrics.http_req_duration.values['p(90)'];
  let rps = data.metrics.http_reqs.values['rate'];
  let reqFailed = data.metrics.http_req_failed.values['passes'];
  
  const message = "" + 
		"\nAvg Reponse Time: " + avgResponseTime.toFixed(2) + "ms" +
		"\np95 Response Time: " + p95ResponseTime.toFixed(2) + "ms" +
		"\np90 Response Time: " + p90ReponnseTime.toFixed(2) + "ms" +
		"\nRequest Per Second: " + rps.toFixed(2) + "req/s" + 
		"\nFailed Request: " + reqFailed + "req";

  return {
    stdout: message,
  };
}
