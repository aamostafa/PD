//var customMatchers = {
//    toBeAReasonableExpense: function(){
//        return{
//            compare: function(actual){
//                var pass = actual.isReasonable();
//                var judgement = pass ? 'unreasonable' : 'reasonable';

//                return{
//                    pass: pass,
//                    message: 'Expected expense to be a ' + judgement + ' expense.'
//                };
//            }
//        };
//    }
//}
var newCourseData = {
    Category: null,
    CategoryId: 0,
    Competencies: null,
    Description: null,
    Details: null,
    EndDate: null,
    FAQs: [],
    ID: -1,
    ImageUrl: null,
    Instructor: null,
    Name: "",
    Participants: null,
    PublishingDate: null,
    RequiredBackground: null,
    SessionStates: [],
    Sessions: [],
    StartDate: null,
    TargetAudience: null,
    UserCourses: []
};
var categorySectionData = {
    results: [
        {
            $id: "1",
            $type: "PD.Contracts.Entities.CategorySection, PD",
            Id: 1,
            Name: "Areas",
            Categories: []
        },
        {
            $id: "2",
            $type: "PD.Contracts.Entities.CategorySection, PD",
            Id: 3,
            Name: "Other",
            Categories: []
        },
        {
            $id: "3",
            $type: "PD.Contracts.Entities.CategorySection, PD",
            Id: 2,
            Name: "Soft Skills",
            Categories: []
        },
        {
            $id: "4",
            $type: "PD.Contracts.Entities.CategorySection, PD",
            Id: 4,
            Name: "Technical Courses",
            Categories: []
        }
    ]
};


var CompetencyData = {
    results: [
        {
            $id: "1",
            $type: "PD.Contracts.Entities.Competency, PD",
            Id: 1,
            Name: "Soft Skills",
            ParentId: null,
            Competencies1: [],
            Competency1: null
        },
        {
            $id: "10",
            $type: "PD.Contracts.Entities.Competency, PD",
            Id: 9,
            Name: "Teaching Skills",
            ParentId: null,
            Competencies1: [
                {
                    $id: "11",
                    $type: "PD.Contracts.Entities.Competency, PD",
                    Id: 10,
                    Name: "Using Technology",
                    ParentId: 9,
                    Competencies1: [],
                    Competency1: {
                        $ref: "10"
                    }
                },
                {
                    $id: "12",
                    $type: "PD.Contracts.Entities.Competency, PD",
                    Id: 11,
                    Name: "Lesson Planning",
                    ParentId: 9,
                    Competencies1: [],
                    Competency1: {
                        $ref: "10"
                    }
                },
                {
                    $id: "13",
                    $type: "PD.Contracts.Entities.Competency, PD",
                    Id: 12,
                    Name: "Teaching Practices",
                    ParentId: 9,
                    Competencies1: [],
                    Competency1: {
                        $ref: "10"
                    }
                }
            ],
            Competency1: null
        }
    ]
};

var CategoriesData = {
    results: [
        {
            $id: "1",
            $type: "PD.Contracts.Entities.Category, PD",
            Id: 2,
            Name: "English",
            SectionId: 1,
            CategorySection: null,
            Courses: []
        },
        {
            $id: "2",
            $type: "PD.Contracts.Entities.Category, PD",
            Id: 3,
            Name: "Math",
            SectionId: 1,
            CategorySection: null,
            Courses: []
        },
        {
            $id: "3",
            $type: "PD.Contracts.Entities.Category, PD",
            Id: 1,
            Name: "Teaching Mechanisms",
            SectionId: 1,
            CategorySection: null,
            Courses: []
        }
    ]
};