#include<bits/stdc++.h>
using namespace std;

class Solution {
private:
    vector<string> getallsubstrs(string& s) {
        int n = s.length();
        vector<string> result;
        for(int i=0;i<n;i++) {
            string temp = "";
            for(int j=i;j<n;j++) {
                temp+=s[j];
                result.push_back(temp);
            }
        }
        return result;
    }
public:
    vector<string> shortestSubstrings(vector<string>& arr) {
        ios_base::sync_with_stdio(0);
        cin.tie(0);
        cout.tie(0);

        map<pair<int,string>,int> mp;
        for(auto& it:arr) {
            auto substr = getallsubstrs(it);
            for(const auto& str:substr) {
                mp[{str.length(),str}];
            }
        }
        map<int,pair<int,string>> revmp;

        int order = 1;

        for(const auto& it:mp) {
            mp[it.first] = order;
            revmp[order] = it.first;
            order++;
        }

        map<int,int> freq;

        for(auto& s:arr) {
            auto substrs = getallsubstrs(s);
            for(const auto& substr:substrs) {
                int id = mp[{substr.length(),substr}];
                freq[id]++;
            }
        }

        vector<string> ans;

        for(auto& s:arr) {
            string cur_ans = "";
            set<int> uniqueVal;
            auto substrings = getallsubstrs(s);
            for(const auto& substr:substrings) {
                int id = mp[{substr.length(),substr}];
                freq[id]--;
                uniqueVal.insert(id);
            }

            for(const auto& id:uniqueVal) 
            {
                if(freq[id]==0) {
                    cur_ans = revmp[id].second;
                    break;
                }
            }

             for(const auto& substr:substrings) {
                int id = mp[{substr.length(),substr}];
                freq[id]++;
            }

            ans.push_back(cur_ans);
        }
        return ans;
    }
};