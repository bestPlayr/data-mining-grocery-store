from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data = pd.read_csv('data.csv')
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(data['Products'])

class ProductQuery(BaseModel):
    name: str

class AproriQuery(BaseModel):
    products: list

def search_product(name):
    vec_name = vectorizer.transform([name])
    cosine_sim = cosine_similarity(tfidf_matrix, vec_name).flatten()
    indices = np.argsort(cosine_sim)[::-1]
    results = data.iloc[indices][1:5]
    return results['Products'].tolist()

def aprori_rules(product):
    
    data = pd.read_csv("data1.csv")
    transactions = data["Transactions"].apply(lambda x: [item.strip() for item in x.split(",")])
    

    te = TransactionEncoder()
    te_ary = te.fit(transactions).transform(transactions)
    df = pd.DataFrame(te_ary, columns=te.columns_)
   
    frequent_itemsets = apriori(df, min_support=0.001, use_colnames=True)
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.5)
    
   
    rules_dict = {}
    for _, row in rules.iterrows():
        antecedents = frozenset(row['antecedents'])  
        consequents = frozenset(row['consequents'])
        rules_dict[antecedents] = consequents


    items = frozenset(product)
    print("Looking up rules for:", items) 

   
    output = rules_dict.get(items)

    if output is None:
        print("No rules found for:", items) 
        return []  

    print("Type of output:", type(output))  
    return list(output)  


@app.post("/search")
async def search_endpoint(query: ProductQuery):
    try:
        results = search_product(query.name)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/rules')
def get_rules(query: AproriQuery):
    try:
        products = list(query.products)
        print("Received products:", products)  
        results = aprori_rules(products)
        print("Results from aprori_rules:", results)  
        return {"results": results}
    except Exception as e:
        print("An error occurred:", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error: " + str(e))



