export class College {
    name: string;
    id: number;
    city: string;
    state: string;
    zip: string;
    school_url: string;
    alias: string;
    predominant_degree_awarded_number: number;
    predominant_degree_awarded: string;
    degrees_awarded_highest_number: number;
    degrees_awarded_highest: string;
    ownership_number: number;
    ownership: string;
    operating_number: number;
    operating: string;
    tuition_revenue_per_fte: number;

    private degree_codes = ['Not classified', 
    'Predominantly certificate-degree granting', 
    "Predominantly associate's-degree granting",
	"Predominantly bachelor's-degree granting",
    'Entirely graduate-degree granting'];
    
    private ownership_codes = ["Public", "Private nonprofit",
    "Private for-profit"];

    constructor(name, id, city, state, zip, url, alias, pre_degree_awarded_num, degree_highest_num,
        ownership_num, operating_num, tuition_revenue_per_fte) {
            this.name = name;
            this.id = id;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.school_url = url;
            this.alias = alias;
    
            this.predominant_degree_awarded_number = pre_degree_awarded_num;
            this.degrees_awarded_highest_number = degree_highest_num;

            this.ownership_number = ownership_num;
            this.operating_number = operating_num;

            this.tuition_revenue_per_fte = tuition_revenue_per_fte;

            // conversions:
            this.convertPredominantDegree(this.predominant_degree_awarded_number);
            this.convertHighestDegreeAwarded(this.degrees_awarded_highest_number);
            this.convertOwnerShip(this.ownership_number);
            this.convertOperating(this.operating_number);

        }
    
    private convertPredominantDegree(num) {
        this.predominant_degree_awarded = this.degree_codes[num];
    }
    private convertHighestDegreeAwarded(num) {
        this.degrees_awarded_highest = this.degree_codes[num];
    }
    private convertOwnerShip(num) {
        this.ownership = this.ownership_codes[num - 1];
    }
    private convertOperating(num) {
        if(num === 1) {
            this.operating = 'yes';
        }
        else if (num  === 0) {
            this.operating = 'no';
        }
    }

}